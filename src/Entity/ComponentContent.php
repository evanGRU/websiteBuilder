<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name: 'content_type', type: 'string')]
#[ORM\DiscriminatorMap([
    'text' => Text::class,
    'div' => Div::class,
])]
abstract class ComponentContent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    protected ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'content')]
    #[ORM\JoinColumn(nullable: false)]
    protected ?Component $component = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getComponent(): ?Component
    {
        return $this->component;
    }

    public function setComponent(Component $component): static
    {
        $this->component = $component;
        return $this;
    }
}

