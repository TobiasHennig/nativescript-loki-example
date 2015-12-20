var fs = require("file-system");
var Loki = require("../node_modules/nativescript-loki/nativescript-loki.js");

describe("Loki", function() {
    var db,
        documents = fs.knownFolders.documents(),
        path = fs.path.join(documents.path, "loki.db"),
        anotherPath = fs.path.join(documents.path, "new-name.db");
    
    beforeEach(function() {
        // Setup Loki
        db = new Loki();
        db.saveDatabase();
    });
    
    afterEach(function() {
        // Remove old database files
        if(fs.File.exists(path)) {
            documents.getFile("loki.db").remove();
        }
        if(fs.File.exists(anotherPath)) {
            documents.getFile("new-name.db").remove();
        }
    });
    
    it("constructor", function() {
        expect(db.name).toBe("loki");
        expect(db.extension).toBe(".db");
    });
    
    it("exists", function() {
        expect(db.exists()).toBe(true);
    });
    
    it("rename", function() {
        expect(fs.File.exists(path)).toBe(true);
        db.rename("new-name").then(function() {
            expect(fs.File.exists(anotherPath)).toBe(true);
            expect(fs.File.exists(path)).toBe(false);
        });
    });
    
    it("remove", function() {
        expect(fs.File.exists(path)).toBe(true);
        db.remove().then(function() {
            expect(fs.File.exists(path)).toBe(false);
        });
    });
});
