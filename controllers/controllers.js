const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

async function homeIndex(req, res) {
  const query = `SELECT * FROM public."Projects"`;
  const projectsData = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("index", { data: projectsData });
}

async function projectPage(req, res) {
  const query = `SELECT * FROM public."Projects"`;
  const blogsData = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("project", {
    title: "Project list",
  });
}

async function projectAddPage(req, res) {
  res.send("");
}

async function projectAdd(req, res) {
  let title = req.body.title;
  let startDate = req.body.start_date;
  let endDate = req.body.end_date;
  let description = req.body.description;
  let technologies = req.body.technologies;
  let image = req.body.image;

  if (title == "" || startDate == "" || endDate == "" || description == "") {
    return alert("All input fields cannot be empty");
  }

  try {
    const query = `INSERT INTO public."Projects" (title, description, technologies, start_date, end_date, image, "createdAt")
                VALUES
      ('${title}', '${description}', 
      '${technologies}', '${new Date(startDate).toISOString()}', 
      '${new Date(endDate).toISOString()}', '${image}', 
      '${new Date().toISOString()}')`;

    const project = await sequelize.query(query, {
      type: QueryTypes.INSERT,
    });

    res.send(`Berhasil! ${project}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectDetailPage(req, res) {
  res.render("project-detail");
}

async function projectUpdatePage(req, res) {}

async function projectUpdate(req, res) {
  let title = req.body.title;
  let startDate = new Date(req.body.start_date).toISOString();
  let endDate = new Date(req.body.end_date).toISOString();
  let description = req.body.description;
  let technologies = req.body.technologies;
  let image = req.body.image;
  let id_project = req.body.id;
  if (title == "" || startDate == "" || endDate == "" || description == "") {
    return alert("All input fields cannot be empty");
  }

  try {
    const query = `UPDATE public."Projects" SET 
                    title = '${title}',
                    description = '${description}',
                    start_date = '${startDate}',
                    technologies = '${technologies}',
                    end_date = '${endDate}',
                    image = '${image}',
                    "updatedAt" = '${new Date().toISOString()}'
                  WHERE id = '${id_project}'              
    `;
    const project = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
    });

    res.send(`Berhasil memperbaharui ${project}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function projectDelete(req, res) {
  try {
    const query = `DELETE FROM public."Projects" WHERE id = '${req.body.id}'`;
    const project = await sequelize.query(query, {
      type: QueryTypes.DELETE,
    });

    res.send(`Berhasil menghapus data! ${project}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function blogPage(req, res) {
  const query = `SELECT * FROM public."Blogs"`;
  const blogsData = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("blog", {
    title: "Blog Page",
    data: blogsData,
  });
}

function blogDetailPage(req, res) {
  let id = req.params.id;
  res.send("blog-detail");
}

async function blogAddPage(req, res) {
  res.send("");
}

async function blogAdd(req, res) {}

async function blogUpdatePage(req, res) {}

async function blogUpdate(req, res) {}

async function blogDelete(req, res) {}

async function testimonialPage() {}

async function testimonialAddPage() {}

async function testimonialAdd() {}

async function testimonialUpdatePage() {}

async function testimonalUpdate() {}

async function testimonalDelete() {}

async function contactPage(req, res) {
  res.render("contact");
}

module.exports = {
  homeIndex,
  blogPage,
  blogDetailPage,
  blogAddPage,
  contactPage,
  projectPage,
  projectDetailPage,
  projectAddPage,
  projectAdd,
  projectUpdatePage,
  projectUpdate,
  projectDelete,
};
