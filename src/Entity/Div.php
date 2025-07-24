<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "component_div")]
class Div extends ComponentContent
{
    #[ORM\Column(length: 255)]
    private ?string $class = null;

    public function getClass(): ?string
    {
        return $this->class;
    }

    public function setClass(string $class): static
    {
        $this->class = $class;
        return $this;
    }
}
