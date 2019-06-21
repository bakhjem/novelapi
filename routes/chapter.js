var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var novel = {};
  var idnovels = req.query.novelid;
  var idchapter = req.query.chapterid;
  const URL = "https://bestlightnovel.com/";

  const getPageContent = uri => {
    const options = {
      uri,
      headers: {
        "User-Agent": "Request-Promise"
      },
      transform: body => {
        return cheerio.load(body);
      }
    };

    return request(options);
  };
  var data = [];
  var novelsname = null;
  var author = null;
  var genresdata = [];
  var chapterlist = [];
  var dateupdate = null;
  var othername = null;
  var lasterchapter = null;
  var idnovel = null;
  var cover = null;
  var lastupdates = [];
  var update_time = null;
  var id = null;
  var totalpages = null;
  getPageContent(URL + idnovels+'/'+idchapter).then($ => {
    chaptername = $('.name_chapter h1').text();
    content = $('.vung_doc').html();
    novel = {
        idnovels: idnovels,
        idchapter: idchapter,
        chaptername: chaptername,
        content: content
    }
    res.send(JSON.stringify(novel));
  });
});

module.exports = router;
