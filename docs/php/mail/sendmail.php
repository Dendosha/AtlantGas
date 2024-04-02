<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// require_once('vendor/autoload.php');
require_once __DIR__ . '/../vendor/autoload.php';
$mailSettings = require_once __DIR__ . '/mailSettings.php';

function sendMail(array $mailSettings, array $replyTo, string $subject, string $body, string $altBody = '', array $attachments = [])
{
	$mail = new PHPMailer(true);

	try {
		//Server settings
		$mail->SMTPDebug = SMTP::DEBUG_OFF;
		$mail->isSMTP();
		$mail->Host = $mailSettings['host'];
		$mail->SMTPAuth = $mailSettings['auth'];
		$mail->Username = $mailSettings['username'];
		$mail->Password = $mailSettings['password'];
		$mail->SMTPSecure = $mailSettings['secure'];
		$mail->Port = $mailSettings['port'];
		$mail->CharSet = $mailSettings['charset'];

		//Recipients
		$mail->setFrom($mailSettings['fromEmail'], $mailSettings['fromName']);
		foreach ($replyTo as $email) {
			$mail->addAddress($email);
		}

		//Attachments
		if ($attachments) {
			foreach ($attachments as $attachment) {
				$mail->addAttachment($attachment);
			}
		}

		//Content
		$mail->isHTML($mailSettings['isHtml']);
		$mail->Subject = $subject;
		$mail->Body = $body;
		if ($altBody) {
			$mail->AltBody = $altBody;
		}

		$mail->send();
		echo json_encode('Скоро с вами свяжется наш специалист');
	} catch (Exception $e) {
		echo json_encode("Текст ошибки: {$mail->ErrorInfo}");
	}
}

$body = "
<h1>Форма обратной связи</h1>\n
<p><strong>Имя: </strong> {$_POST['name']}</p>
<p><strong>Телефон: </strong> {$_POST['phone']}</p>
";

if (isset($_POST['question'])) {
	$body .= "<p><strong>Вопрос: </strong> {$_POST['question']}</p>";
} elseif (isset($_POST['gas-volume'])) {
	$body .= "<p><strong>Объём газа: </strong> {$_POST['gas-volume']}</p>";
}


sendMail($mailSettings['mailSettingsProd'], $mailSettings['mailSettingsProd']['replyTo'], 'Форма обратной связи', $body);
