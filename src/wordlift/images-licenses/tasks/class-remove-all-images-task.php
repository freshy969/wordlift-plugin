<?php

namespace Wordlift\Images_Licenses\Tasks;

use Wordlift\Images_Licenses\Image_License_Service;
use Wordlift\Tasks\Task;

class Remove_All_Images_Task implements Task {

	/**
	 * @var Image_License_Service
	 */
	private $image_license_service;

	/**
	 * Remove_All_Images_Task constructor.
	 *
	 * @param Image_License_Service $image_license_service
	 */
	public function __construct( $image_license_service ) {

		$this->image_license_service = $image_license_service;

	}

	/**
	 * @inheritDoc
	 */
	function get_id() {

		return 'wl_remove_all_images_task';
	}

	function get_label() {

		return __( 'Remove all images', 'wordlift' );
	}

	/**
	 * @inheritDoc
	 */
	function list_items( $limit = 10, $offset = 0 ) {

		$data = $this->image_license_service->get_non_public_domain_images();

		return array_slice( $data, $offset, $limit );
	}

	/**
	 * @inheritDoc
	 */
	function count_items() {

		$data = $this->image_license_service->get_non_public_domain_images();

		return count( $data );
	}

	/**
	 * @inheritDoc
	 */
	function process_item( $item ) {

		foreach ( $item['posts_ids_as_embed'] as $post_id ) {

			$filename       = $item['filename'];
			$filename_quote = preg_quote( $filename );
			$post           = get_post( $post_id );
			$search         = array(
				'@<a[^>]*href="[^"]+wl/[^"]+' . $filename_quote . '"[^>]*>(.+?)<\/a>@',
				'@<img[^>]*src="[^"]+wl/[^"]+' . $filename_quote . '"[^>]*>@',
			);
			$replace        = array( '$1', '', );
			$post_content   = preg_replace( $search, $replace, $post->post_content );

			wp_update_post( array(
				'ID'           => $post_id,
				'post_content' => $post_content,
			) );

		}

		wp_delete_attachment( $item['attachment_id'], true );

	}

}
