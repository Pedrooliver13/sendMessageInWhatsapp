const ERegex = {
  REMOVE_BREAK_LINE: /[\n\t]+/,
};

const convertTextToList = (text) => {
  if (!text) {
    return [];
  }

  const listOfLines = text
    .split(ERegex.REMOVE_BREAK_LINE)
    .map((line) => line.trim())
    .filter((line) => line);

  return listOfLines;
};

const sendMessageInWhatsApp = async (text) => {
  const mainContainer = document.querySelector("#main");
  const textarea = mainContainer?.querySelector(`div[contenteditable="true"]`);
  const listOfLines = convertTextToList(text);

  const isInvalid = !textarea || !listOfLines.length;

  if (isInvalid) {
    return console.error("Error: textarea or text not found!");
  }

  for (const line of listOfLines) {
    console.log("line", line);

    textarea.focus();
    document.execCommand("insertText", false, line);
    textarea.dispatchEvent(new Event("change", { bubbles: true }));

    setTimeout(() => {
      mainContainer.querySelector(`[data-icon="send"]`).click();
    }, 100);

    if (listOfLines.indexOf(line) !== listOfLines.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  return listOfLines.length;
};

// Example of usage:
sendMessageInWhatsApp(`Hello, 

I'm a bot!`).then((numberOfMessages) => {
  console.log("numberOfMessages", numberOfMessages);
});
