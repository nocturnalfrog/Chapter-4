assert = require("assert")
Browser = require("zombie")
browser = new Browser()

describe "Bulletin Board System", ->

  it "contains an empty #board div on startup", (done) ->
    browser.visit "http://localhost:9001", ->
      assert.ok browser.success

      board = browser.query("#board")
      assert.ok board
      assert.equal browser.text("#board h1"), "No Posts Found"
      done()


  it "prompts a #modal-post when clicking #nav-publish", (done) ->
    assert.ok browser.success

    assert.equal browser.text("#modal-type"), ""
    modal = browser.query("#modal-post")
    browser.clickLink "#nav-publish", ->
      assert.equal browser.text("#modal-type"), "Post"
      done()

  it "publishes a .post when clicking #btn-publish", (done) ->
    assert.ok browser.query("#board h1")
    browser.fill("#form-message", "Here's a Post")
    .clickLink "#btn-publish", ->
      assert.ok not browser.query("#board h1")
      assert.equal browser.text("#board:nth-child(1) span"), "Here's a Post"
      done()

  it "publishes a .reply when clicking #btn-publish", (done) ->
    browser.clickLink "Reply", ->
      assert.equal browser.text("#modal-type"), "Reply"

      browser.fill("#form-message", "Here's a Reply")
      .clickLink "#btn-publish", ->
        assert.equal browser.text(".reply"), "Here's a Reply"
        done()
