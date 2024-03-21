function sideBar() {
  var html = HtmlService.createHtmlOutputFromFile('body').setTitle('Side Bar');
  DocumentApp.getUi().showSidebar(html);
}
function addMenu() {
  // Create the add-on menu with a sample item
  var menu = DocumentApp.getUi()  // Use SpreadsheetApp for Docs menus
      .createMenu('Resizer')
      .addItem('SideBar', 'sideBar');  // Add a sample menu item

  // Add the menu to the UI
  menu.addToUi();
}


function onOpen(e) {
  // Run the addMenu function on document open
  addMenu();
}

function getImageDimensions() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  // Check if there's a selection
  if (selection) {
    var elements = selection.getRangeElements(); // Use getRangeElements()
    var image = elements.filter(function(element) {
      return element.getElement().getType() == DocumentApp.ElementType.INLINE_IMAGE;
    })[0]; // Assuming only one image selected
    if (image) {
      var imageElement = image.getElement().asInlineImage();
      // Access image properties
      var height = imageElement.getHeight();
      var width = imageElement.getWidth();
      // Update the input fields with retrieved dimensions (consider using a separate function for this)
      // DocumentApp.getUi().alert(width);
      return [height,width]
    } else {
      return []
    }
  } else {
    // Handle empty selection (optional: display message)
    return []
  }
}

function setImageDimensions([height,width]) {
  var selection = DocumentApp.getActiveDocument().getSelection();
  // Check if there's a selection
  if (selection) {
    var elements = selection.getRangeElements(); // Use getRangeElements()
    var image = elements.filter(function(element) {
      return element.getElement().getType() == DocumentApp.ElementType.INLINE_IMAGE;
    })[0]; // Assuming only one image selected
    if (image) {
    var imageElement = image.getElement().asInlineImage();
    imageElement.setHeight(height);
    imageElement.setWidth(width);
    // ... (optional: confirmation message)
    return [height, width];
  } else {
      return []
    }
  } else {
    // Handle empty selection (optional: display message)
    return []
  }
}

function setAllImageDimensions([height, width]) {
  var document = DocumentApp.getActiveDocument();
  var body = document.getBody();
  
  // Get all inline images
  var images = body.getImages();
  
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    // DocumentApp.getUi().alert(height);
    image.setHeight(height);
    image.setWidth(width);
  }
  
}





