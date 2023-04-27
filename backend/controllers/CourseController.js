import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (err) {
    console.log(err);
    res.status(500).end(JSON.stringify(err));
  }
};

export const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id);
    if (course.username === req.body.username) {
      try {
        const updatedCourse = await Course.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedCourse);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('Not Allowed!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id);

    try {
      await course.delete();
      res.status(200).json('Course has been deleted...');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readcourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readCourses = async (req, res) => {
  const username = req.query.username;
  const category = req.query.category;
  try {
    let courses;
    if (category) {
      courses = await Course.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      courses = await Course.find();
    }
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default {
  createCourse,
  updateCourse,
  deleteCourse,
  readcourse,
  readCourses,
};
