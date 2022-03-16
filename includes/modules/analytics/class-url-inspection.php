<?php
/**
 * URL Inspection features.
 *
 * @since      3.0.8
 * @package    RankMathPro
 * @subpackage RankMathPro
 * @author     Rank Math <support@rankmath.com>
 */

namespace RankMathPro\Analytics;

use RankMathPro\Analytics\DB;
use RankMath\Traits\Hooker;

/**
 * Url_Inspection class.
 */
class Url_Inspection {

	use Hooker;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->filter( 'rank_math/analytics/url_inspection_map_properties', 'map_inspection_properties', 10, 2 );
		$this->filter( 'rank_math/analytics/get_inspections_results', 'internationalize_inspection_coverage', 10 );
		$this->action( 'rank_math/analytics/get_inspections_query', 'add_filter_params', 10, 2 );
		$this->action( 'rank_math/analytics/get_inspections_count_query', 'add_filter_params', 10, 2 );
	}

	/**
	 * Filter to alter the where clause used in the get_inspections function.
	 *
	 * @param string $where  WHERE clause.
	 * @param array  $params Parameters.
	 *
	 * @return string
	 */
	public function add_filter_params( $query, $params ) {
		if ( empty( $params['indexingFilter'] ) ) {
			return;
		}

		$table = DB::inspections()->table;
		$query->where( "$table.coverage_state", self::inspection_coverage_state_i18n( $params['indexingFilter'], true ) );
	}

	/**
	 * Map properties in the API result to columns in the database.
	 *
	 * @param array $normalized Normalized data.
	 * @param array $incoming   Incoming data from the API.
	 *
	 * @return array
	 */
	public function map_inspection_properties( $normalized, $incoming ) {
		$handler = \RankMath\Google\Url_Inspection::get();

		$handler->assign_inspection_value( $incoming, 'richResultsResult.detectedItems', 'rich_results_items', $normalized );
		$handler->assign_inspection_value( $incoming, 'indexStatusResult.lastCrawlTime', 'last_crawl_time', $normalized );

		// Store the raw response, too.
		$normalized['raw_api_response'] = wp_json_encode( $incoming );

		return $normalized;
	}

	/**
	 * Map strings to strings ran through gettext.
	 *
	 * @param string $string String to translate.
	 */
	public static function inspection_coverage_state_i18n( $string, $flip = false ) {
		$strings = [
			'Submitted and indexed'              => esc_html__( 'Submitted and indexed', 'rank-math-pro' ),
			'URL is unknown to Google'           => esc_html__( 'URL is unknown to Google', 'rank-math-pro' ),
			'Crawled - currently not indexed'    => esc_html__( 'Crawled - currently not indexed', 'rank-math-pro' ),
			'Discovered - currently not indexed' => esc_html__( 'Discovered - currently not indexed', 'rank-math-pro' ),
			'Indexed, not submitted in sitemap'  => esc_html__( 'Indexed, not submitted in sitemap', 'rank-math-pro' ),
			'Submitted URL marked ‘noindex’'     => esc_html__( 'Submitted URL marked ‘noindex’', 'rank-math-pro' ),
			'Duplicate, submitted URL not selected as canonical' => esc_html__( 'Duplicate, submitted URL not selected as canonical', 'rank-math-pro' ),
		];

		if ( $flip ) {
			$strings = array_flip( $strings );
		}

		return isset( $strings[ $string ] ) ? $strings[ $string ] : $string;
	}

	/**
	 * Make the coverage_state translatable in the results
	 *
	 * @param array $results Data rows.
	 */
	public function internationalize_inspection_coverage( $results ) {
		foreach ( $results as $key => $result ) {
			$results[ $key ]->coverage_state = self::inspection_coverage_state_i18n( $result->coverage_state );
		}

		return $results;
	}

	/**
	 * Get stats for "Presence on Google" widget.
	 */
	public static function get_presence_stats() {
		$localized = [];
		$stats     = DB::get_presence_stats();
		foreach ( $stats as $presence_string => $count ) {
			$localized[ self::inspection_coverage_state_i18n( $presence_string ) ] = $count;
		}

		return $localized;
	}

	/**
	 * Get stats for "Top Statuses" widget.
	 */
	public static function get_status_stats() {
		return DB::get_status_stats();
	}
}
