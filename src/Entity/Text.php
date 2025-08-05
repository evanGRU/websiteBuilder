<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "component_text")]
class Text extends ComponentContent
{
    #[ORM\Column(length: 255)]
    private ?string $tag = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $value = null;

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(string $tag): static
    {
        $this->tag = $tag;
        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): static
    {
        $this->value = $value;
        return $this;
    }
}
