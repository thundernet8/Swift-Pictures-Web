$(document).ready(function() {
    $("#flfile").fileinput({
        uploadUrl: window.uploadUrl,
        allowedFileExtensions: ["jpeg", "jpg", "png", "gif", "bmp"],
        overwriteInitial: false,
        maxFileSize: 5120,
        maxFilesNum: 10,
        maxFileCount: 10,
        theme: "fa",
        showPreview: true,
        language: "zh"
    });
    $("#flfile").on("fileuploaded", function(event, data, previewId, index) {
        var form = data.form,
            files = data.files,
            extra = data.extra,
            response = data.response,
            reader = data.reader;
        if (response.code == 1) {
            const result = response.result;
            if ($("showurl").css("display")) {
                $("#urlcode").append(result.url + "\n");
                $("#htmlcode").append(
                    '&lt;img src="' +
                        result.url +
                        '" alt="' +
                        files[index].name +
                        '" title="' +
                        files[index].name +
                        '" /&gt;' +
                        "\n"
                );
                $("#bbcode").append("[img]" + result.url + "[/img]" + "\n");
                $("#markdown").append(
                    "![" + files[index].name + "](" + result.url + ")" + "\n"
                );
                $("#deletecode").append(result.delete + "\n");
            } else if (result.url) {
                $("#showurl").show();
                $("#urlcode").append(result.url + "\n");
                $("#htmlcode").append(
                    '&lt;img src="' +
                        result.url +
                        '" alt="' +
                        files[index].name +
                        '" title="' +
                        files[index].name +
                        '" /&gt;' +
                        "\n"
                );
                $("#bbcode").append("[img]" + result.url + "[/img]" + "\n");
                $("#markdown").append(
                    "![" + files[index].name + "](" + result.url + ")" + "\n"
                );
                $("#deletecode").append(result.delete + "\n");
            }
        }
    });
});
