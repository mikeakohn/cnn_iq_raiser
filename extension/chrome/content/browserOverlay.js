/**
 * CNNIqRaiser namespace.
 */


var CNNIqRaiser =
{
  onLoad: function()
  {
    // initialization code
    //this.initialized = true;
    //window.addEventListener("load", function(e) { CNNIqRaiser.onLoad(e); }, false); 

    var appcontent = document.getElementById("appcontent");
    if(appcontent)
    {
      appcontent.addEventListener("DOMContentLoaded", CNNIqRaiser.onPageLoad, true);
    }
  },

  onPageLoad: function(evt)
  {
    var url = window.content.document.URL;
    if (url.indexOf("?") >= 0)
    {
      url = url.substring(0,url.indexOf("?"));
    }

    if (url == "http://www.cnn.com/")
    {
      var links = window.content.document.getElementsByTagName("a");
      var video_text = "";
      var filters = [ "bieber", "biebs",
                      "octomom", "william and kate", "will and kate",
                      "diddy", "middleton", "goes viral", "kate and will",
                      "prince william", "gossip", "snooki",
                      "angry birds", "pippa", "go viral",
                      "kate gosselin", "joybehar", "kardashian",
                      "ridiculist", "gotta watch", "duggar", "omg",
                      "viral video", "nancy grace", "shades of grey",
                      "fifty shades", "honey boo boo",
                      "!", ".." ];

      //window.alert(links.length);

      var video_link = "";

      for (var i in links)
      {
        var s = links[i].innerHTML.toLowerCase();
        s = s.replace(/&amp;/g, "and");
        s = s.replace(/\(/g, "");
        s = s.replace(/\)/g, "");
        var l = links[i].href.toLowerCase();
        l = l.replace(/_/g, " ");
        l = l.replace(/\./g, " ");
        l = l.replace(/-/g, " ");

        iq_raise = 0

        if (s.indexOf("?") !== -1)
        {
          iq_raise = 1;
        }
          else
        {
          for (var n in filters)
          {
            if (s.indexOf(filters[n]) >= 0 || l.indexOf(filters[n]) >= 0)
            {
              iq_raise = 1;
              break;
            }
          }
        }

        if (iq_raise == 1)
        {
          links[i].innerHTML = "<font color='red'>IQ Level Raised Here</font>";
          links[i].href = "javascript:alert('In order to protect you from becoming an idiot, this article was filtered.');";
        }

        if (links[i].href.indexOf("/video/") >= 0)
        {
          if (s.indexOf("<img") == 0)
          {
            links[i].innerHTML += "<br /><font color='green'>^Non-video news from Google</font>";
            links[i].href = "http://news.google.com/news?q="+encodeURIComponent(video_link);
            video_link = "";
          }
            else
          {
            video_link = s;
          }
        }
          else
        {
          video_link = "";
        }
      }
    }
      else
    if (url.indexOf(".cnn.com/") > 0)
    {
      var divs = window.content.document.getElementsByTagName("div");
      for (var i in divs)
      {
        if (divs[i].id.indexOf("dsq-comment-message") == 0 ||
            divs[i].id.indexOf("comment-") == 0)
        {
          var person = "an idiot";
          var comment = divs[i].innerHTML.toLowerCase();
          var filters = [ "zion", "muslim", "arab", "blacks", "islam",
                          "hispanics", "latinos", "nazi" ];
          var prefix = "";

          if (divs[i].id.indexOf("comment-") == 0)
          {
            if (divs[i].innerHTML.indexOf("<br>") > 0)
            {
              prefix = divs[i].innerHTML.substring(0, divs[i].innerHTML.indexOf("<br>")+4);
            }       
          }

          for (var n in filters)
          {
            if (comment.indexOf(filters[n]) >= 0)
            {
              person = "a racist";
              break;
            }
          }

          divs[i].innerHTML = prefix + "<font color='red'>This person is " + person + ".</font>";
        }
      }
    }
  }
};

window.addEventListener("load", function(e) { CNNIqRaiser.onLoad(e); }, false); 

