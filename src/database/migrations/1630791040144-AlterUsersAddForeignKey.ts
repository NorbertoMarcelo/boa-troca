import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterUsersAddForeignKey1630791040144
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'FKAdUser',
        referencedTableName: 'ads',
        referencedColumnNames: ['id'],
        columnNames: ['ads'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'ads');
  }
}
