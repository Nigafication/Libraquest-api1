'use strict';

const createdAt = new Date('2026-01-01T00:00:00.000Z');
const endedAt = new Date('2026-01-01T01:00:00.000Z');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          user_id: 1,
          school_id: 'SOR-0001',
          full_name: 'LibraQuest Host',
          email: 'host@libraquest.local',
          role: 'host',
          createdAt,
          updatedAt: createdAt,
        },
        {
          user_id: 2,
          school_id: 'SOR-0002',
          full_name: 'Maria Santos',
          email: 'maria@libraquest.local',
          role: 'player',
          createdAt,
          updatedAt: createdAt,
        },
        {
          user_id: 3,
          school_id: 'SOR-0003',
          full_name: 'Juan Dela Cruz',
          email: 'juan@libraquest.local',
          role: 'player',
          createdAt,
          updatedAt: createdAt,
        },
        {
          user_id: 4,
          school_id: 'SOR-0004',
          full_name: 'Ana Reyes',
          email: 'ana@libraquest.local',
          role: 'player',
          createdAt,
          updatedAt: createdAt,
        },
      ],
      { ignoreDuplicates: true },
    );

    await queryInterface.bulkInsert(
      'question_sets',
      [
        {
          set_id: 1,
          title: 'Library Fundamentals',
          description:
            'A sample LibraQuest question set about library and reading fundamentals.',
          subject: 'Library Science',
          grade_level: 'College',
          createdAt,
          updatedAt: createdAt,
        },
      ],
      { ignoreDuplicates: true },
    );

    await queryInterface.bulkInsert(
      'game_sessions',
      [
        {
          session_id: 1,
          host_id: 1,
          question_set_id: 1,
          join_code: '482913',
          status: 'completed',
          ended_at: endedAt,
          createdAt,
          updatedAt: endedAt,
        },
      ],
      { ignoreDuplicates: true },
    );

    await queryInterface.bulkInsert(
      'players',
      [
        {
          player_id: 1,
          session_id: 1,
          user_id: 2,
          nickname: 'Maria',
          total_stars: 15,
          total_response_time: 42.5,
          completed: true,
          createdAt,
          updatedAt: endedAt,
        },
        {
          player_id: 2,
          session_id: 1,
          user_id: 3,
          nickname: 'Juan',
          total_stars: 12,
          total_response_time: 38.2,
          completed: true,
          createdAt,
          updatedAt: endedAt,
        },
        {
          player_id: 3,
          session_id: 1,
          user_id: 4,
          nickname: 'Ana',
          total_stars: 9,
          total_response_time: 35.7,
          completed: true,
          createdAt,
          updatedAt: endedAt,
        },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('players', {
      session_id: 1,
    });

    await queryInterface.bulkDelete('game_sessions', {
      session_id: 1,
    });

    await queryInterface.bulkDelete('question_sets', {
      set_id: 1,
    });

    await queryInterface.bulkDelete('users', {
      user_id: [1, 2, 3, 4],
    });
  },
};
