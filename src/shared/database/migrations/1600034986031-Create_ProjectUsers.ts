import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProjectUsers1600034986031
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'project_users',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'project_id',
                        type: 'uuid',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'UserProjects',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'ProjectUsers',
                        columnNames: ['project_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'projects',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project_users', true, true);
    }
}
