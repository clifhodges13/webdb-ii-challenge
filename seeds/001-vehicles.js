
exports.seed = function(knex) {
  return knex('vehicles').truncate()
    .then(function () {
      return knex('vehicles').insert([
        {
          VIN: 'bdje837idndnk3i08',
          make: 'Honda',
          model: 'Civic LX',
          mileage: '092333',
          transmissionType: 'auto',
          titleStatus: 'lien'
        },
        {
          VIN: 'nfi39euddndnk3i08',
          make: 'Acura',
          model: 'Integra',
          mileage: '123877',
          transmissionType: 'manual',
          titleStatus: 'clean'
        },
        {
          VIN: 'nfi39eunfi39euddndnk3i08',
          make: 'Chevrolet',
          model: 'Silverado',
          mileage: '146458',
          transmissionType: '',
          titleStatus: ''
        }
      ]);
    });
};
