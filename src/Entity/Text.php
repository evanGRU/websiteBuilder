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
    private ?string $text = null;

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(string $tag): static
    {
        $this->tag = $tag;
        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): static
    {
        $this->text = $text;
        return $this;
    }
}
