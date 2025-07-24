<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250724125937 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE component (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_49FEA157166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE component_content (id INT AUTO_INCREMENT NOT NULL, component_id INT NOT NULL, content_type VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_4EC9B180E2ABAFFF (component_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE component_div (id INT NOT NULL, class VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE component_text (id INT NOT NULL, tag VARCHAR(255) NOT NULL, text VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE component ADD CONSTRAINT FK_49FEA157166D1F9C FOREIGN KEY (project_id) REFERENCES projects (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE component_content ADD CONSTRAINT FK_4EC9B180E2ABAFFF FOREIGN KEY (component_id) REFERENCES component (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE component_div ADD CONSTRAINT FK_FBF292B8BF396750 FOREIGN KEY (id) REFERENCES component_content (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE component_text ADD CONSTRAINT FK_87AB10F1BF396750 FOREIGN KEY (id) REFERENCES component_content (id) ON DELETE CASCADE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE component DROP FOREIGN KEY FK_49FEA157166D1F9C
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE component_content DROP FOREIGN KEY FK_4EC9B180E2ABAFFF
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE component_div DROP FOREIGN KEY FK_FBF292B8BF396750
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE component_text DROP FOREIGN KEY FK_87AB10F1BF396750
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE component
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE component_content
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE component_div
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE component_text
        SQL);
    }
}
