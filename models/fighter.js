const FIGHTER = {
  id: '',
  name: '',
  health: 85,
  power: 0,
  defense: 1, // 1 to 10
};

const FIGHTER_FIELDS = Object.keys(FIGHTER);
const REQUIRED_FIELDS_CREATE = FIGHTER_FIELDS.filter(
  (field) => field !== 'id' && field !== 'health'
);

export { FIGHTER, FIGHTER_FIELDS, REQUIRED_FIELDS_CREATE };
