import Role from '../models/Role.js';

export const createRole = async (req, res) => {
  const newRole = new Role(req.body);
  try {
    const savedRole = await newRole.save();
    res.status(200).json(savedRole);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateRole = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedRole = await Role.findOneAndUpdate({ _id: id }, req.body, { returnOriginal: false });

    if (updatedRole) {
      res.status(200).json({
        success: true,
        msg: 'Role has been updated...',
        updatedRole,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    const role = await Role.findById(id);

    try {
      await role.delete();
      res.status(200).json('Role has been deleted...');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json(role);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readRoles = async (req, res) => {
  const { RoleIds } = req.query;
  if (RoleIds) {
    const ids = RoleIds.split(',') || [];
    if (ids.length > 0) {
      try {
        const roles = await Role.find({ _id: { $in: ids } });
        return res.status(200).json(roles);
      } catch (err) {
        return res.status(400).json({ msg: 'Error retrieving roles' });
      }
    }
  }

  try {
    let roles;

    roles = await Role.find({});
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { createRole, updateRole, deleteRole, readRole, readRoles };
