<?php
/**
 * Pages: Admin Settings page.
 *
 * @since   3.11.0
 * @package Wordlift/admin
 */
?>

<div class="wrap">

	<h2><?php _e( 'WorldLift Settings', 'wordlift' ); ?></h2>

	<?php settings_errors(); ?>

	<form action="options.php" method="post">
		<?php
		settings_fields( 'wl_general_settings' );
		do_settings_sections( 'wl_general_settings' );
		submit_button();
		?>
	</form>
</div>
