function PnlGraph() {
  var self = this;

  var bookListKey = "grt.book.list=";

  this.random = new Rickshaw.Fixtures.RandomData(150);
  this.books = [];
  this.configUrl = "http://usl20024360.am.hedani.net:8082/";

  this.parseBooks = function(configBlob) {
    try {
      return configBlob.split(bookListKey)[1].split(" ")[0].split(",");
    }
    catch(err) {
      return this.books;
    }
  };

  this.fetchBooks = function() {
    try {
      $.get(
        this.configUrl,
        function(data) { self.books = self.parseBooks(data.responseText);}
      )
    } catch(err) {
      // TODO this is a hack and should be removed when book list is available.
      self.books = ['HDG3','MNG1','N210','N221','N280','N284','N285','N296','UCE5','UDE7'];
    }
  };

  this.seriesData = this.setSeriesData();

  this.graph = new Rickshaw.Graph({
    element: document.getElementById("chart"),
    width: 900,
    height: 500,
    renderer: 'area',
    stroke: true,
    preserve: true,
    series: this.seriesFormat(this.seriesData)
  });

  this.fetchData = function() {
    var url = "http://usl20002317.am.hedani.net:8090/render/?_salt=1386091225.157&target=stats.gauges.DailyPNL.N285&format=json";
    $.get(url, function(data) {
      console.log(data);
      self.random.removeData(self.seriesData);
      self.random.addData(self.seriesData);
      self.graph.update();
    })
  };
}

PnlGraph.prototype.seriesFormat = function(seriesData) {
    return [
        {
            color: "#b0c3e6",
            data: seriesData[0],
            name: 'UDE7'
        },
        {
            color: "#333333",
            data: seriesData[1],
            name: 'N221'
        }
    ];
};

PnlGraph.prototype.setSeriesData = function() {
  this.fetchBooks();
  var seriesData = [ [], [] ];
  for (var i = 0; i < 150; i++) {
      this.random.addData(seriesData);
  }
  return seriesData;
};

PnlGraph.prototype.render = function() {
  this.graph.render();

  var slider = new Rickshaw.Graph.RangeSlider( {
      graph: this.graph,
      element: $('#preview')
  } );

  var hoverDetail = new Rickshaw.Graph.HoverDetail( {
      graph: this.graph,
      xFormatter: function(x) {
          return new Date(x * 1000).toString();
      }
  } );

  var annotator = new Rickshaw.Graph.Annotate( {
      graph: this.graph,
      element: document.getElementById('timeline')
  } );

  var legend = new Rickshaw.Graph.Legend( {
      graph: this.graph,
      element: document.getElementById('legend')
  } );

  var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
      graph: this.graph,
      legend: legend
  } );

  var order = new Rickshaw.Graph.Behavior.Series.Order( {
      graph: this.graph,
      legend: legend
  } );

  var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight( {
      graph: this.graph,
      legend: legend
  } );

  var smoother = new Rickshaw.Graph.Smoother( {
      graph: this.graph,
      element: $('#smoother')
  } );

  var ticksTreatment = 'glow';

  var xAxis = new Rickshaw.Graph.Axis.Time( {
      graph: this.graph,
      ticksTreatment: ticksTreatment,
      timeFixture: new Rickshaw.Fixtures.Time.Local()
  } );

  xAxis.render();

  var yAxis = new Rickshaw.Graph.Axis.Y( {
      graph: this.graph,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      ticksTreatment: ticksTreatment
  } );

  yAxis.render();

  var controls = new RenderControls( {
      element: document.querySelector('form'),
      graph: this.graph
  } );

  setInterval(this.fetchData, 3000);
};
