<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @since      1.0.0
 * @package    RankMath
 * @subpackage RankMathPro\Admin
 * @author     MyThemeShop <admin@mythemeshop.com>
 */

namespace RankMathPro\Admin;

use RankMathPro\Updates;
use RankMathPro\Status\System_Status;
use RankMath\Helper;
use RankMath\Traits\Hooker;

defined( 'ABSPATH' ) || exit;

/**
 * Admin class.
 *
 * @codeCoverageIgnore
 */
class Admin {

	use Hooker;

	/**
	 * Register hooks.
	 */
	public function __construct() {
		$this->action( 'init', 'init_components' );
		add_filter( 'rank_math/analytics/classic/pro_notice', '__return_empty_string' );
		$this->filter( 'rank_math/settings/sitemap', 'special_seprator' );

		new Updates();
		new System_Status();
	}

	/**
	 * Initialize the required components.
	 */
	public function init_components() {
		$components = [
			'bulk_actions'            => 'RankMathPro\\Admin\\Bulk_Actions',
			'post_filters'            => 'RankMathPro\\Admin\\Post_Filters',
			'media_filters'           => 'RankMathPro\\Admin\\Media_Filters',
			'quick_edit'              => 'RankMathPro\\Admin\\Quick_Edit',
			'trends_tool'             => 'RankMathPro\\Admin\\Trends_Tool',
			'setup_wizard'            => 'RankMathPro\\Admin\\Setup_Wizard',
			'redirection'             => 'RankMathPro\\Admin\\Redirection',
			'links'                   => 'RankMathPro\\Admin\\Links',
			'misc'                    => 'RankMathPro\\Admin\\Misc',
			'csv_import'              => 'RankMathPro\\Admin\\CSV_Import_Export\\CSV_Import_Export',
			'csv_import_redirections' => 'RankMathPro\\Admin\\CSV_Import_Export_Redirections\\CSV_Import_Export_Redirections',
		];

		if ( Helper::is_amp_active() ) {
			$components['amp'] = 'RankMathPro\\Admin\\Amp';
		}

		$components = apply_filters( 'rank_math/admin/pro_components', $components );
		foreach ( $components as $name => $component ) {
			$this->components[ $name ] = new $component();
		}
	}

	/**
	 * Add Special seprator into sitemap option panel
	 *
	 * @param array $tabs Hold tabs for optional panel.
	 *
	 * @return array
	 */
	public function special_seprator( $tabs ) {
		if ( Helper::is_module_active( 'news-sitemap' ) || Helper::is_module_active( 'video-sitemap' ) || Helper::is_module_active( 'local-seo' ) ) {
			$tabs['special'] = [
				'title' => esc_html__( 'Special Sitemaps:', 'rank-math-pro' ),
				'type'  => 'seprator',
			];
		}

		return $tabs;
	}

	/**
	 * Load setup wizard.
	 */
	private function load_setup_wizard() {
		if ( Helper::is_wizard() ) {
			new Setup_Wizard();
		}
	}

}
