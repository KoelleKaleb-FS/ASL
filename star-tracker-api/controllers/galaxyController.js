const { Galaxy } = require('../models');

exports.index = async (req, res) => {
  const galaxies = await Galaxy.findAll();
  res.render('galaxies/index', { galaxies });
};

exports.new = (req, res) => {
  res.render('galaxies/new');
};

exports.create = async (req, res) => {
  await Galaxy.create(req.body);
  res.redirect('/galaxies');
};

exports.show = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  res.render('galaxies/show', { galaxy });
};

exports.edit = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  res.render('galaxies/edit', { galaxy });
};

exports.update = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  await galaxy.update(req.body);
  res.redirect(`/galaxies/${req.params.id}`);
};

exports.delete = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  await galaxy.destroy();
  res.redirect('/galaxies');
};

// JSON methods
exports.indexJson = async (req, res) => {
  const galaxies = await Galaxy.findAll();
  res.json(galaxies);
};

exports.createJson = async (req, res) => {
  const galaxy = await Galaxy.create(req.body);
  res.json(galaxy);
};

exports.showJson = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  res.json(galaxy);
};

exports.updateJson = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  await galaxy.update(req.body);
  res.json(galaxy);
};

exports.deleteJson = async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id);
  await galaxy.destroy();
  res.json({ message: 'Galaxy deleted' });
};
