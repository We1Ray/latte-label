const DataBaseInfo = require("../DataBaseInfo.json");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const lib = require("../library");
const Minio = require("minio");
const logger = require("../logger");

router.route("/get_account_available_label_project").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    account_uid: req.body["account_uid"] ? req.body["account_uid"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/get_account_available_label_project.sql"
      )
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_account_available_label_project",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_project_label_data").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    project_id: req.body["project_id"] ? req.body["project_id"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(__dirname, "../sql/label_project/get_project_label_data.sql")
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_project_label_data",
    DBConfig,
    sql,
    parameter,
    (response) => {
      let files = [];
      const minioClient = new Minio.Client({
        endPoint: "172.20.10.45",
        port: 9000,
        useSSL: false,
        accessKey: "rbmsHL6a7NWgMk1c",
        secretKey: "gagjOyZKPnp8DFr14pxqSC9N7ScWq6Iu",
      });

      const bucketName = "storage";
      const expires = 24 * 60 * 60;

      async function fetchData() {
        try {
          for (let index = 0; index < response.rows.length; index++) {
            const element = response.rows[index];
            const imagePath = path.join(element["data_path"]);

            // Wrap the asynchronous operation in a Promise
            const presignedUrl = await new Promise((resolve, reject) => {
              minioClient.presignedGetObject(
                bucketName,
                imagePath,
                expires,
                (err, url) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(url);
                  }
                }
              );
            });

            files.push({
              data_id: element["data_id"],
              data_name: element["data_name"],
              data_path: imagePath,
              url: presignedUrl,
            });
          }
          res.send(files); // Send the response after the loop completes
        } catch (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        }
      }
      fetchData();
      // res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_project_label_data_yolo").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    project_id: req.body["project_id"] ? req.body["project_id"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/get_project_label_data_yolo.sql"
      )
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_project_label_data_yolo",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_project_label_type").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    project_id: req.body["project_id"] ? req.body["project_id"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(__dirname, "../sql/label_project/get_project_label_type.sql")
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_project_label_type",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_label_project_account_group").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    account_uid: req.body["account_uid"] ? req.body["account_uid"] : null,
    project_id: req.body["project_id"] ? req.body["project_id"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/get_label_project_account_group.sql"
      )
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_label_project_account_group",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_lable_project_group").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    project_id: req.body["project_id"] ? req.body["project_id"] : null,
    update_user: req.body["update_user"] ? req.body["update_user"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/get_lable_project_group.sql"
      )
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_lable_project_group",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_account_label_group").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    account_uid: req.body["account_uid"] ? req.body["account_uid"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/get_account_label_group.sql"
      )
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_account_label_group",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_label_group_member").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    group_id: req.body["group_id"] ? req.body["group_id"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(__dirname, "../sql/label_project/get_label_group_member.sql")
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_label_group_member",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/get_member_not_in_group").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let parameter = {
    group_id: req.body["group_id"] ? req.body["group_id"] : null,
    update_user: req.body["update_user"] ? req.body["update_user"] : null,
  };
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/get_member_not_in_group.sql"
      )
    )
    .toString();
  await lib.executeSQL(
    "label_project/get_member_not_in_group",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response.rows);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/insert_label_data").post(async (req, res) => {
  const minioClient = new Minio.Client({
    endPoint: "172.20.10.45",
    port: 9000,
    useSSL: false,
    accessKey: "rbmsHL6a7NWgMk1c",
    secretKey: "gagjOyZKPnp8DFr14pxqSC9N7ScWq6Iu",
  });

  const bucketName = "storage";

  const checkAndCreateDirectory = async (bucket, object) => {
    try {
      await minioClient.statObject(bucket, object);
    } catch (err) {
      if (err.code === "NotFound") {
        // 目錄不存在，建立目錄
        await minioClient.putObject(bucket, object, new Buffer(""), 0, {
          "Content-Type": "application/directory",
        });
      }
    }
  };

  let DBConfig = DataBaseInfo["DS"];
  let sql = fs
    .readFileSync(
      path.resolve(__dirname, "../sql/label_project/insert_label_data.sql")
    )
    .toString();
  let parameter = [];

  await Promise.all(
    req.body.map(async (element, i) => {
      try {
        // if (i !== 0 && i % 200 == 0) {
        //   await new Promise((resolve) => setTimeout(resolve, 5000));
        // }
        await checkAndCreateDirectory(bucketName, element["project_id"] + "/");

        // 檔案路徑
        const filePath = element["project_id"] + "/" + element["data_name"];

        const buffer = Buffer.from(element["file"], "base64");
        // 上傳檔案

        minioClient.putObject(
          bucketName,
          filePath,
          buffer,
          buffer.length,
          "application/octet-stream",
          async function (err, etag) {
            if (err) {
              logger.error(err);
              return console.log(err);
            }
          }
        );

        parameter.push({
          account_uid: element["account_uid"] ? element["account_uid"] : null,
          data_id: element["data_id"] ? element["data_id"] : null,
          data_name: element["data_name"] ? element["data_name"] : null,
          data_path: element["project_id"] ? filePath : null,
          project_id: element["project_id"] ? element["project_id"] : null,
        });
      } catch (error) {
        console.log(i + " error" + error);
      }
    })
  );

  await lib.executeSQL(
    "label_project/insert_label_data",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/insert_label_group_member").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/insert_label_group_member.sql"
      )
    )
    .toString();
  let parameter = [];
  await Promise.all(
    req.body.map(async (item) => {
      parameter.push({
        group_id: item["group_id"] ? item["group_id"] : null,
        account_uid: item["value"] ? item["value"] : null,
        update_user: item["update_user"] ? item["update_user"] : null,
      });
    })
  );
  await lib.executeSQL(
    "label_project/insert_label_group_member",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/insert_label_data_yolo").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let sql = fs
    .readFileSync(
      path.resolve(__dirname, "../sql/label_project/insert_label_data_yolo.sql")
    )
    .toString();
  let parameter = [];
  await Promise.all(
    req.body.map(async (item) => {
      item.map(async (element) => {
        parameter.push({
          data_id: element["data_id"] ? element["data_id"] : null,
          label_type_id: element["label_type_id"]
            ? element["label_type_id"]
            : null,
          x: element["x"] ? element["x"] : null,
          y: element["y"] ? element["y"] : null,
          w: element["w"] ? element["w"] : null,
          h: element["h"] ? element["h"] : null,
        });
      });
    })
  );
  await lib.executeSQL(
    "label_project/insert_label_data_yolo",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/upsert_label_group").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];

  let executeList = [];

  executeList.push({
    parameter: req.body,
    sql: fs
      .readFileSync(
        path.resolve(__dirname, "../sql/label_project/upsert_label_group.sql")
      )
      .toString(),
  });

  executeList.push({
    parameter: {
      group_id: req.body["group_id"] ? req.body["group_id"] : null,
      account_uid: req.body["update_user"] ? req.body["update_user"] : null,
      update_user: req.body["update_user"] ? req.body["update_user"] : null,
    },
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/insert_label_group_member.sql"
        )
      )
      .toString(),
  });

  await lib.executeSQLs(
    "label_project/upsert_label_group",
    DBConfig,
    executeList,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/upsert_label_project").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let executeList = [];

  executeList.push({
    parameter: req.body["project"],
    sql: fs
      .readFileSync(
        path.resolve(__dirname, "../sql/label_project/upsert_label_project.sql")
      )
      .toString(),
  });

  executeList.push({
    parameter: req.body["project"],
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_project_group.sql"
        )
      )
      .toString(),
  });

  executeList.push({
    parameter: req.body["group"],
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/insert_label_project_group.sql"
        )
      )
      .toString(),
  });

  executeList.push({
    parameter: {},
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_data_yolo_not_in_tpye.sql"
        )
      )
      .toString(),
  });

  executeList.push({
    parameter: req.body["project"],
    sql: fs
      .readFileSync(
        path.resolve(__dirname, "../sql/label_project/delete_label_type.sql")
      )
      .toString(),
  });

  if (req.body["type"].length > 0) {
    executeList.push({
      parameter: req.body["type"],
      sql: fs
        .readFileSync(
          path.resolve(
            __dirname,
            "../sql/label_project/insert_label_project_type.sql"
          )
        )
        .toString(),
    });
  }

  executeList.push({
    parameter: {},
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_data_yolo_not_in_tpye.sql"
        )
      )
      .toString(),
  });

  await lib.executeSQLs(
    "label_project/upsert_label_project",
    DBConfig,
    executeList,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/delete_label_project_data").post(async (req, res) => {
  const minioClient = new Minio.Client({
    endPoint: "172.20.10.45",
    port: 9000,
    useSSL: false,
    accessKey: "rbmsHL6a7NWgMk1c",
    secretKey: "gagjOyZKPnp8DFr14pxqSC9N7ScWq6Iu",
  });
  const bucketName = "storage";

  let DBConfig = DataBaseInfo["DS"];
  let parameter = [];
  await Promise.all(
    req.body["data_id"].map(async (element) => {
      parameter.push({
        data_id: element ? element : null,
      });
    })
  );
  async function delet_minio_file() {
    minioClient.removeObjects(bucketName, req.body["data_path"], (err) => {
      if (err) {
        console.error("Error removing object:", err);
      }
    });
  }
  await delet_minio_file();

  let executeList = [];
  executeList.push({
    parameter: parameter,
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_data_yolo.sql"
        )
      )
      .toString(),
  });
  executeList.push({
    parameter: parameter,
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_project_data.sql"
        )
      )
      .toString(),
  });

  await lib.executeSQLs(
    "label_project/delete_label_project_data",
    DBConfig,
    executeList,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/delete_label_data_yolo").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let sql = fs
    .readFileSync(
      path.resolve(__dirname, "../sql/label_project/delete_label_data_yolo.sql")
    )
    .toString();
  let parameter = [];

  await Promise.all(
    req.body.map(async (element) => {
      parameter.push({
        data_id: element ? element : null,
      });
    })
  );

  await lib.executeSQL(
    "label_project/delete_label_data_yolo",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/delete_label_group_member").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];
  let sql = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../sql/label_project/delete_label_group_member.sql"
      )
    )
    .toString();
  let parameter = [];

  await Promise.all(
    req.body.map(async (element) => {
      parameter.push({
        account_uid: element["account_uid"] ? element["account_uid"] : null,
        group_id: element["group_id"] ? element["group_id"] : null,
      });
    })
  );

  await lib.executeSQL(
    "label_project/delete_label_group_member",
    DBConfig,
    sql,
    parameter,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

router.route("/delete_label_project").post(async (req, res) => {
  let DBConfig = DataBaseInfo["DS"];

  let parameter = {
    project_id: req.body["project_id"] ? req.body["project_id"] : null,
  };

  let executeList = [];
  executeList.push({
    parameter: parameter,
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_data_yolo_from_project.sql"
        )
      )
      .toString(),
  });
  executeList.push({
    parameter: parameter,
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_project_data_from_project.sql"
        )
      )
      .toString(),
  });
  executeList.push({
    parameter: parameter,
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_type_from_project.sql"
        )
      )
      .toString(),
  });
  executeList.push({
    parameter: parameter,
    sql: fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../sql/label_project/delete_label_group_enable_from_project.sql"
        )
      )
      .toString(),
  });
  executeList.push({
    parameter: parameter,
    sql: fs
      .readFileSync(
        path.resolve(__dirname, "../sql/label_project/delete_label_project.sql")
      )
      .toString(),
  });

  const minioClient = new Minio.Client({
    endPoint: "172.20.10.45",
    port: 9000,
    useSSL: false,
    accessKey: "rbmsHL6a7NWgMk1c",
    secretKey: "gagjOyZKPnp8DFr14pxqSC9N7ScWq6Iu",
  });
  const bucketName = "storage";
  async function deleteMinioFolder(folderPath) {
    const objectsList = minioClient.listObjectsV2(
      bucketName,
      folderPath,
      true,
      ""
    );
    objectsList.on("data", async function (obj) {
      minioClient.removeObject(bucketName, obj.name, (err) => {
        if (err) {
          console.error("Error removing objects:", err);
        }
      });
      // await new Promise((resolve) => setTimeout(resolve, 500));
    });

    objectsList.on("error", function (err) {
      console.log(err);
    });
  }
  await deleteMinioFolder(req.body["project_id"]);

  await lib.executeSQLs(
    "label_project/delete_label_project",
    DBConfig,
    executeList,
    (response) => {
      res.send(response);
    },
    (error) => {
      res.status(400).json({ error: error });
    }
  );
});

module.exports = router;
