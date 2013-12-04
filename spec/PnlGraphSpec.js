describe("PnlGraph", function() {
  var pnlGraph;
  var getUrl;

  var standardResponseText = 'elay.mins=60 sps.foxhound.polling.new.subscriptions.prev.close.start.delay.mins=0 sps.foxhound.polling.new.subscriptions.prev.close.delay.mins=1 sps.stale.price.mins=10 sps.close.price.auditor.history.size=100000 sps.opra.ftp.servers=nyl06a-6604.equity.csfb.com,pnl06a-6604.equity.csfb.com sps.opra.ftp.username=grt sps.opra.ftp.password=4LRgjcV8 sps.opra.ftp.directory=/app/pulse/ftp sps.opra.ftp.filename=osi_options.eod. volpublisher.jms.volfitter.queue=grt.uat2.volpub.requests volpublisher.amm.host=amm52.equity.csfb.com volpublisher.amm.port=13306 volpublisher.ticker.list=.* webui.db.driver=org.postgresql.Driver webui.db.username=s109424 webui.db.password= webui.port=8083 webui.write.every.nth.batch=2 deletedpositionenricher.delay.seconds=300 scenario.task.queue.max=100 scenario.pool.size=2 grt.ssh.user=s109424 grt.activemq.yeti.host.primary=usl20013715 grt.activemq.yeti.host.backup=usl20013716 grt.activemq.core.host.primary=usl20013717 grt.activemq.core.host.backup=usl20013716 grt.jms.url=failover\:(tcp\://usl20013717.am.hedani.net\:61616,tcp\://usl20013716.am.hedani.net\:61616)?randomize\=false&priorityBackup\=true valuationengine.jms.url=failover\:(tcp\://usl20013715.am.hedani.net\:61616,tcp\://usl20013716.am.hedani.net\:61616)?randomize\=false&priorityBackup\=true grt.app.servers=usl20024360 usl20024361 usl20024362 usl20024363 usl20024364 usl20024365 usl20024366 usl20024367 usl20035599 usl20035600 usl20035601 grt.vdc.servers.first=usl20013715 grt.vdc.servers=usl20013715.am.hedani.net usl20013716 usl20013717 grt.nagios.host=usl20024360 grt.postgres.host=usl20024361 grt.book.list=GOOG,HDG2,N210,N221,N222,N223,N228,N234,N236,N246,N258,N280,N281,N284,N285,N296,UDE7,UCE5,MNG1,HDG3 dacs.id=316_grt_1 grt.services.for.host.usl20024360=webui configservice dataserver grt.services.for.host.usl20024361=deletedpositionenricher rdapositionviewer-C grt.services.for.host.usl20024362=calccontroller-LLC scenario grt.services.for.host.usl20024363=dependencyadapter spotpriceservice rhapsodyadapter grt.services.for.host.usl20024364=viewserver-A grt.services.for.host.usl20024365=gorillaadapter grt.services.for.host.usl20024366=pnlenricher grt.services.for.host.usl20024367=calccontroller-CSI1';
  var newBooksResponse = 'elay.mins=60 sps.foxhound.polling.new.subscriptions.prev.close.start.delay.mins=0 sps.foxhound.polling.new.subscriptions.prev.close.delay.mins=1 sps.stale.price.mins=10 sps.close.price.auditor.history.size=100000 sps.opra.ftp.servers=nyl06a-6604.equity.csfb.com,pnl06a-6604.equity.csfb.com sps.opra.ftp.username=grt sps.opra.ftp.password=4LRgjcV8 sps.opra.ftp.directory=/app/pulse/ftp sps.opra.ftp.filename=osi_options.eod. volpublisher.jms.volfitter.queue=grt.uat2.volpub.requests volpublisher.amm.host=amm52.equity.csfb.com volpublisher.amm.port=13306 volpublisher.ticker.list=.* webui.db.driver=org.postgresql.Driver webui.db.username=s109424 webui.db.password= webui.port=8083 webui.write.every.nth.batch=2 deletedpositionenricher.delay.seconds=300 scenario.task.queue.max=100 scenario.pool.size=2 grt.ssh.user=s109424 grt.activemq.yeti.host.primary=usl20013715 grt.activemq.yeti.host.backup=usl20013716 grt.activemq.core.host.primary=usl20013717 grt.activemq.core.host.backup=usl20013716 grt.jms.url=failover\:(tcp\://usl20013717.am.hedani.net\:61616,tcp\://usl20013716.am.hedani.net\:61616)?randomize\=false&priorityBackup\=true valuationengine.jms.url=failover\:(tcp\://usl20013715.am.hedani.net\:61616,tcp\://usl20013716.am.hedani.net\:61616)?randomize\=false&priorityBackup\=true grt.app.servers=usl20024360 usl20024361 usl20024362 usl20024363 usl20024364 usl20024365 usl20024366 usl20024367 usl20035599 usl20035600 usl20035601 grt.vdc.servers.first=usl20013715 grt.vdc.servers=usl20013715.am.hedani.net usl20013716 usl20013717 grt.nagios.host=usl20024360 grt.postgres.host=usl20024361 grt.book.list=N221,N234 dacs.id=316_grt_1 grt.services.for.host.usl20024360=webui configservice dataserver grt.services.for.host.usl20024361=deletedpositionenricher rdapositionviewer-C grt.services.for.host.usl20024362=calccontroller-LLC scenario grt.services.for.host.usl20024363=dependencyadapter spotpriceservice rhapsodyadapter grt.services.for.host.usl20024364=viewserver-A grt.services.for.host.usl20024365=gorillaadapter grt.services.for.host.usl20024366=pnlenricher grt.services.for.host.usl20024367=calccontroller-CSI1';

  var successResponse = {
    status: 200,
    responseText: standardResponseText
  };

  var mockSuccessBookFetch = function() {
    $.get = function(_url, success) {
      getUrl = _url;
      success(successResponse);
    };
  };

  sandbox(
    "<div id='chart'></div>" +
    "<div id='preview'></div>" +
    "<div id='timeline'></div>" +
    "<div id='smoother'></div>" +
    "<div id='legend'></div>" +
    "<form></form>");

  beforeEach(function() {
    pnlGraph = new PnlGraph();
  });

  describe("set series data", function() {
    it("fetches the book list", function() {
      mockSuccessBookFetch();

      pnlGraph.setSeriesData();

      expect(pnlGraph.books).toBeNonEmpty();
    });
  });

  describe("fetch books", function() {
    it("parses the book list on success", function() {
      mockSuccessBookFetch();

      pnlGraph.fetchBooks();

      expect(pnlGraph.books.length).toEqual(20);
      expect(getUrl).toBeTruthy();
    });
  });

  describe("parse books", function() {
    it("loads a book", function() {
      expect(pnlGraph.parseBooks(standardResponseText)).toContain("UDE7");
    });

    it("loads a different book", function() {
      var result = pnlGraph.parseBooks(newBooksResponse);

      expect(result).toContain("N221");
      expect(result).toNotContain("UDE7");
    });

    it("will handle a response with no key", function() {
      expect(pnlGraph.parseBooks("no key UDE7, UCE5")).toEqual(pnlGraph.books);
    })
  });
});