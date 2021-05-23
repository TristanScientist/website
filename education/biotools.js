//////
// a really simple d3 example

// Let's start off by explaining the structure of the data we are going to use,
// and how we intend the html to look.
//
// The data we will use is structured like this,:
//   [category,category,category,...]
// where a category is structured like this:
//   {"heading":"Category Heading", "links":[link,link,link,...]}
// and a link is structured like this:
//   ["The title of the link","http://the.link.url/"]
//
// We are going to use this data to build out the page to look like this:
// <div id="topContainer">
//   <div>
//     <h4>Category Heading 1</h4>
//     <div class="newspaper">
//       <a href="http://the.url.for/1a">The title for link 1a<br></a>
//       <a href="http://the.url.for/1b">The title for link 1b<br></a>
//       <a href="http://the.url.for/1c">The title for link 1c<br></a>
//       ...
//     </div>
//   </div>
//   <div>
//     <h4>Category Heading 2</h4>
//     <div class="newspaper">
//       <a href="http://the.url.for/2a">The title for link 2a<br></a>
//       <a href="http://the.url.for/2b">The title for link 2b<br></a>
//       <a href="http://the.url.for/2c">The title for link 2c<br></a>
//       ...
//     </div>
//   </div>
//   ...
// </div>

// For this example we'll define a callback function for d3 to call, upon data retrieval;
// the bulk of the work will be done within this callback function.
function onDataLoaded(error, linkData) {
  if (error) return alert(error);
  var top = d3.select("#topContainer");// use d3 to grab the container who's id we set to 'topContainer'
  
  // get a selection of all child <div> tags in the container
  // (the first time this runs there wont be any, but doing this sets up for the next step)
  var categoryDivs = top.selectAll("div");
  
  // Here comes the part that a lot of people seem to struggle understanding and lead them to think D3
  // has a steep learning curve: Data Binding and the "update", "enter", and "exit" selections.
  // I think if you can get this the rest of D3 should click into place.
  
  // The next call associates the data with the (empty) selection; it returns the "update" selection which
  // contains all divs that have corresponding linkData (again, the first time this runs there wont be any)
  var updatingCategories = categoryDivs.data(linkData);
  
  // the "update" selection has a reference to the "enter" selection, which is the set of data for which
  // D3 couldn't find corresponding existing div elements (ie. data that are "enter"ing)
  var enteringCategories = updatingCategories.enter();
  
  // NOTE: There is also an exit() function which is similar to enter() except that it returns a selection
  // containing elements that didn't have a corresponding datum in the data (ie. the data are "exit"ing).
  // This allows you to remove() those elements (or transition them out if you want to be more fancy)
  //
  // NOTE: If you have visual elements that you need to update (eg. change it's style because its
  // associated data changed), the original "update" selection can be used for that.
  
  // For each entering category, append an <div> element. append() will return a selection of all the new
  // div elemnts.  These div elements will have the corresponding entering category objects associated with
  // them.  D3 does this for you by storing references to them in the " __data__" property of the visual 
  // elements.)
  var divs = enteringCategories.append("div");
  
  // Note: For brevity, the above code could have been written as follows:
  //
  //   var divs = d3
  //     .select("#topContainer")// top
  //     .selectAll("div")       // categoryDivs
  //     .data(linkData)         // updatingCategories
  //     .enter()                // enteringCategories
  //     .append("div")          // divs
  //   ;
  // 
  // This "selectAll().data().enter().append()" method chain is a common pattern among D3
  
  // For each div that we appended, append an <h4> element and set the text within each <h4>
  // to the "heading" property of the corresponding category
  divs.append("h3").text(function (d){ return d.heading });
  
  // Note: quite a few of the D3 methods support method cascading (ie. methods that return
  // "this" so that one can chain multiple method call that all operate on the same object)
  //   See: https://en.wikipedia.org/wiki/Method_cascading
  
  // Also append to each <div>, a nested <div class="newspaper">
  var links = divs.append("div")
    .attr("class","newspaper")// cascaded method call
  ;
  
  // now append an <a> tag for each link
  links
    .selectAll("a")
    .data(function (cat){ return cat.links})// bind to each nested <div>, the links property of the corresponding category
    .enter()
    .append("a")
      // link[0] is the link title
      // link[1] is the url
      .html(function(link){ return link[0] }) // cascaded method
      .attr("href",function(link){ return link[1] }) // cascaded method
      
  ;
  
  /*
  // one last touch up: lets give every other div within each category a
  // background color to distinguish it from the ones above and below it.
  links
    .selectAll("a:nth-child(even)")
    .style("background","#d8d8d8")
  ;
  */
}

// now we will  load the data asynchronously using d3.json("urlToData.json", onDataLoaded);

// (handwaving) normally the data is served from a different url, however this example
// just has the json stored as the text in the hidden <pre> in the html of this pen,
// so we are just going to patch d3.json to have it get the data from the pre tag rather
// than what it normally does; in production code the next line sould be removed
d3.json = function(url, callback){ callback(false, JSON.parse(d3.select('pre').text())) };
//d3.json = function(url, callback){ callback(false, JSON.parse(d3.select('pre').text()).concat(JSON.parse(d3.select('#otherLinks').text()))) };
// (end handwaving)

d3.json("urlToData.json", onDataLoaded);

// Note: d3 also provides support for loading other formats via
//       d3.csv(), d3.tsv(), d3.text(), d3.xml(), and d3.html()
//
//       custom formats can also be supported using d3.xhr()

var origin=window.location.origin;
var a=document.getElementsByTagName("a");
for(var i=0;i<a.length;i++)
{
   var link = a[i];
   if(link.href && link.href.indexOf(origin)!=0)
    link.setAttribute("target", "_blank");
}