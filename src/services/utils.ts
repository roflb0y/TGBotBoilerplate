import fs from "fs";
import moment from "moment";
import request from "request";

export async function download(url: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .pipe(fs.createWriteStream(path))
            .on("finish", resolve)
            .on("error", reject);
    });
}

export function getTimeSince(date: Date) {
    return parseUploadDate(date) + " | " + timeSince(date) + " ago";
}

export function parseUploadDate(date: Date) {
    return moment(date).format("DD.MM.YYYY");
}

export function escapeString(text: string) {
    return text
        .replace(/\_/g, "\\_")
        .replace(/\*/g, "\\*")
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)")
        .replace(/\~/g, "\\~")
        .replace(/\`/g, "\\`")
        .replace(/\>/g, "\\>")
        .replace(/\#/g, "\\#")
        .replace(/\+/g, "\\+")
        .replace(/\-/g, "\\-")
        .replace(/\=/g, "\\=")
        .replace(/\|/g, "\\|")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/\./g, "\\.")
        .replace(/\!/g, "\\!");
}

export function timeSince(date: Date) {
    // thanks Sky Sanders from stackoverflow
    let seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return (
            Math.floor(interval) +
            " " +
            numDeclination(Math.floor(interval), ["year", "years", "years"])
        );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " " +
            numDeclination(Math.floor(interval), ["month", "months", "months"])
        );
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " " +
            numDeclination(Math.floor(interval), ["day", "days", "days"])
        );
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " " +
            numDeclination(Math.floor(interval), ["hour", "hours", "hours"])
        );
    }
    interval = seconds / 60;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " " +
            numDeclination(Math.floor(interval), [
                "minute",
                "minutes",
                "minutes",
            ])
        );
    }
    return (
        Math.floor(seconds) +
        " " +
        numDeclination(Math.floor(interval), ["second", "seconds", "seconds"])
    );
}

// склонение числительных или типа того ну типо минут минуты минуту
function numDeclination(num: number, declensions: string[]): string {
    let n = Math.abs(num);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return declensions[2];
    }
    n %= 10;
    if (n === 1) {
        return declensions[0];
    }
    if (n >= 2 && n <= 4) {
        return declensions[1];
    }
    return declensions[2];
}
