import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {

    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      createdBy: req.user.id
    });

    res.status(200).json({
      success: true,
      tasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const updateTask = async (req, res) => {

  try {

    const task = await Task.findOneAndUpdate(

      {
        _id: req.params.id,
        createdBy: req.user.id
      },

      req.body,

      {
       returnDocument: "after"
     }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


export const deleteTask = async (req, res) => {

  try {

    const task = await Task.findOneAndDelete({

      _id: req.params.id,

      createdBy: req.user.id

    });

    if (!task) {

      return res.status(404).json({

        success: false,

        message: "Task not found"

      });

    }

    res.status(200).json({

      success: true,

      message: "Task deleted"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


export const getAllTasks = async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};