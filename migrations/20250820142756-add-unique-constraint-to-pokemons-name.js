'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Pokemons', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_pokemon_name',
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Pokemons', 'unique_pokemon_name');
  },
};
