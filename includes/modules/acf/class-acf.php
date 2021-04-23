<?php
/**
 * ACF module.
 *
 * @since      2.0.9
 * @package    RankMathPro
 * @author     Rank Math <support@rankmath.com>
 */

namespace RankMathPro\ACF;

use RankMath\Helper;
use RankMath\Traits\Hooker;

defined( 'ABSPATH' ) || exit;

/**
 * ACF class.
 */
class ACF {
	use Hooker;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->action( 'rank_math/sitemap/urlimages', 'add_acf_images', 10, 2 );
		$this->filter( 'rank_math/admin/settings/general', 'acf_sitemap_settings' );
	}

	/**
	 * Add new settings.
	 *
	 * @param object $cmb CMB2 instance.
	 */
	public function acf_sitemap_settings( $cmb ) {
		$field_ids      = wp_list_pluck( $cmb->prop( 'fields' ), 'id' );
		$field_position = array_search( 'include_featured_image', array_keys( $field_ids ), true ) + 1;

		$cmb->add_field(
			[
				'id'      => 'include_acf_images',
				'type'    => 'toggle',
				'name'    => esc_html__( 'Include Images from the ACF Fields.', 'rank-math-pro' ),
				'desc'    => esc_html__( 'Include images added in the ACF fields.', 'rank-math-pro' ),
				'options' => [
					'off' => esc_html__( 'Default', 'rank-math-pro' ),
					'on'  => esc_html__( 'Custom', 'rank-math-pro' ),
				],
				'default' => 'off',
				'dep'     => [ [ 'include_images', 'on' ] ],
			],
			++$field_position
		);
	}

	/**
	 * Filter images to be included for the post in XML sitemap.
	 *
	 * @param array $images  Array of image items.
	 * @param int   $post_id ID of the post.
	 */
	public function add_acf_images( $images, $post_id ) {
		if ( ! Helper::get_settings( 'sitemap.include_acf_images' ) ) {
			return;
		}

		$fields = get_field_objects( $post_id );
		if ( empty( $fields ) ) {
			return $images;
		}

		foreach ( $fields as $field ) {
			if ( ! in_array( $field['type'], [ 'image', 'gallery', 'group', 'repeater' ], true ) ) {
				continue;
			}

			$this->add_images_to_sitemap( $images, $field['value'], $field['type'] );
		}

		return $images;
	}

	/**
	 * Add Images to XML Sitemap.
	 *
	 * @param array   $images     Array of image items.
	 * @param array   $field_data Current Image array.
	 * @param boolean $field_type Is field type gallery.
	 */
	private function add_images_to_sitemap( &$images, $field_data, $field_type ) {
		if ( 'repeater' === $field_type ) {
			$this->add_images_from_repeater_field( $images, $field_data );
			return;
		}

		if ( in_array( $field_type, [ 'gallery', 'group' ], true ) ) {
			foreach ( $field_data as $image ) {
				$this->add_images_to_sitemap( $images, $image, $image['type'] );
			}
			return;
		}

		if ( 'image' === $field_type ) {
			$images[] = [
				'src'   => $field_data['url'],
				'title' => $field_data['title'],
				'alt'   => $field_data['alt'],
			];
		}
	}

	/**
	 * Add Images to XML Sitemap from Repeater field.
	 *
	 * @param array $images     Array of image items.
	 * @param array $field_data Current Image array.
	 */
	private function add_images_from_repeater_field( &$images, $field_data ) {
		foreach ( $field_data as $data ) {
			foreach ( $data as $image ) {
				if ( ! isset( $image['type'] ) || ! in_array( $image['type'], [ 'image', 'gallery', 'group', 'repeater' ], true ) ) {
					continue;
				}

				$this->add_images_to_sitemap( $images, $image, $image['type'] );
			}
		}
	}
}
