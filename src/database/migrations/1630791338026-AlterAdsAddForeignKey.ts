import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterAdsAddForeignKey1630791338026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'ads',
      new TableForeignKey({
        name: 'FKUserAd',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ads', 'user');
  }
}
