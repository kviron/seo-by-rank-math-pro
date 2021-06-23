<?php
/**
 * Analytics Report header template.
 *
 * @package    RankMath
 * @subpackage RankMath\Admin
 */

defined( 'ABSPATH' ) || exit;

?>
<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="report-info">
	<tr>
		<td>
			<h1><?php esc_html_e( 'SEO Report of Your Website', 'rank-math' ); ?></h1>
			###TOP_HTML###
			<h2 class="report-date">###START_DATE### - ###END_DATE###</h2>
			<a href="###SITE_URL###" target="_blank" class="site-url">###SITE_URL_SIMPLE###</a>
		</td>
		<?php if ( $this->get_setting( 'link_full_report', true ) ) : ?>
			<td class="full-report-link">
				<a href="###REPORT_URL###" target="_blank" class="full-report-link">
					<?php esc_html_e( 'FULL REPORT', 'rank-math' ); ?>
					<?php $this->image( 'report-icon-external.png', 12, 12, __( 'External Link Icon', 'rank-math' ) ); ?>
				</a>
			</td>
		<?php endif; ?>
	</tr>
</table>
