<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250805140834 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE style DROP INDEX UNIQ_33BDB86AE2ABAFFF, ADD INDEX IDX_33BDB86AE2ABAFFF (component_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE style DROP INDEX IDX_33BDB86AE2ABAFFF, ADD UNIQUE INDEX UNIQ_33BDB86AE2ABAFFF (component_id)
        SQL);
    }
}
