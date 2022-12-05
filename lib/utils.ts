export function formatDate(data) {
  const date = new Date(data);
  return date.toLocaleDateString();
}

export function uuid() {
  let d = new Date().getTime(); //Timestamp
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function loadDetectedCommands(
  abi,
  onParse = (commands) => {
    commands;
  }
) {
  const commands = [];
  const abiObject = JSON.parse(abi);
  for (const [key, value] of Object.entries(abiObject)) {
    const command = {
      name: value["name"],
      inputs: value["inputs"],
      outputs: value["outputs"],
      stateMutability: value["stateMutability"],
      type: value["type"],
    };
    commands.push(command);
  }
  onParse(commands);
}

export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function shortenify(str) {
  if (!str) return "";
  const len = str.length;
  return str.substring(0, 5) + "..." + str.substring(len - 5);
}

export function copyToClipboard(str) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(str);
}

export function formatDateAndTimeAMPM(datetime) {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export function roundToTwo(num) {
  /* tslint:ignore */
  return +(Math.round(num * 100) / 100);
}

export function removeDuplicates(arr) {
  /* @ts-ignore */
  return [...new Set(arr)];
}

export function flattenObject(ob) {
  let toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
