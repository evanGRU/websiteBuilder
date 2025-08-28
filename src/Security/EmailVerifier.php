<?php

namespace App\Security;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;
use Symfony\Component\Mailer\MailerInterface;
use App\Entity\User;

class EmailVerifier
{
    private VerifyEmailHelperInterface $verifyEmailHelper;
    private MailerInterface $mailer;

    public function __construct(
        VerifyEmailHelperInterface $verifyEmailHelper,
        MailerInterface $mailer
    ) {
        $this->verifyEmailHelper = $verifyEmailHelper;
        $this->mailer = $mailer;
    }

    public function sendEmailConfirmation(string $routeName, User $user): void
    {
        $signature = $this->verifyEmailHelper->generateSignature(
            $routeName,
            $user->getId(),
            $user->getEmail(),
            ['id' => $user->getId()]
        );

        $frontendUrl = "http://127.0.0.1:8000/verify?" . parse_url($signature->getSignedUrl(), PHP_URL_QUERY);
        $email = (new TemplatedEmail())
            ->from('no-reply@zynta.com')
            ->to($user->getEmail())
            ->subject('Confirmez votre inscription 🚀')
            ->htmlTemplate('emails/confirmation.html.twig')
            ->context([
                'verificationURL' => $frontendUrl,
                'expiresAt' => $signature->getExpiresAt(),
            ]);

        $this->mailer->send($email);
    }

    public function handleEmailConfirmation(Request $request, User $user): void
    {
        $this->verifyEmailHelper->validateEmailConfirmation(
            $request->getUri(),
            $user->getId(),
            $user->getEmail()
        );
    }
}
