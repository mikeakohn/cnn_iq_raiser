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
      //var div = window.content.document.getElementsByTagName("div");
      var div = window.content.document.getElementsByClassName("m-ticker");
      var video_text = "";
      var filters = [ "bieber", "biebs",
                      "octomom", "william and kate", "will and kate",
                      "diddy", "middleton", "goes viral", "kate and will",
                      "prince william", "gossip", "snooki",
                      "angry birds", "pippa", "go viral",
                      "kate gosselin", "joybehar", "kardashian",
                      "ridiculist", "gotta watch", "duggar", "omg",
                      "viral video", "nancy grace", "shades of grey",
                      "fifty shades", "boo boo", "bff", "legal pot",
                      "legalize pot", "legal marijuana", "legalize marijuana",
                      "baby bump", "duchess", "royal baby", "prince george",
                      "linsanity", "twerk", "cyrus",
                      "!", ".." ];

      var who_cares = [ "pregnant", "steve-jobs-yacht" ];

      //window.alert(links.length);

      var video_link = "";

      for (var i in links)
      {
        if (links[i].innerHTML == undefined) { continue; }

        var s = links[i].innerHTML.toLowerCase();
        var l = "";
        s = s.replace(/&amp;/g, "and");
        s = s.replace(/\(/g, "");
        s = s.replace(/\)/g, "");

        if (links[i].href != undefined)
        {
          l = links[i].href.toLowerCase();
          l = l.replace(/_/g, " ");
          l = l.replace(/\./g, " ");
          l = l.replace(/-/g, " ");
        }

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

          if (iq_raise == 0 && 
              (s.indexOf("showbiz") >= 0 || l.indexOf("gossip") >= 0))
          {
            for (var n in who_cares)
            {
              if (s.indexOf(filters[n]) >= 0 || l.indexOf(filters[n]) >= 0)
              {
                iq_raise = 1;
                break;
              }
            }
          }
        }

        if (iq_raise == 1)
        {
          links[i].innerHTML = "<font color='red'>IQ Level Raised Here</font>";
          links[i].href = "javascript:alert('In order to protect you from becoming an idiot, this article was filtered.');";
        }
          else
        if (iq_raise == 2)
        {
          links[i].innerHTML = "<font color='red'>Who Cares</font>";
          links[i].href = "javascript:alert('In order to protect you from becoming an idiot, this article was filtered.');";
        }

        if (links[i].href != undefined && links[i].href.indexOf("/video/") >= 0)
        {
          if (s.indexOf("<img") == 0)
          {
            links[i].innerHTML += "<br /><font color='green'>^Non-video news from Google</font>";
            links[i].href = "http://news.google.com/news?q=" + encodeURIComponent(video_link);
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

      // Remove ticker from bottom of screen freeing up more space to read
      // articles.
      for (var i in div)
      {
        div[i].innerHTML = "";
      }
    }
  }
};

window.addEventListener("load", function(e) { CNNIqRaiser.onLoad(e); }, false); 

