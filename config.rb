require 'compass/import-once/activate'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "/"
sass_dir = "/"
images_dir = ""
javascripts_dir = ""

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
preferred_syntax = :scss

cache = false

if environment == :development
# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
    output_style = :expanded
    sourcemap = false
end

if environment == :production
# To disable debugging comments that display the original location of your selectors. Uncomment:
    line_comments = false
    output_style = :compressed
    sourcemap = false
end

require 'fileutils'
on_stylesheet_saved do |file|
    if File.exists?(file)
        filename = File.basename(file, File.extname(file))
        # index
        if filename === "index"
            txt = File.open(file, "a")
            txt.puts "@import '../../components/picker/picker.wxss';"
            txt.close
        end
        # modal
        if filename === "egModal"
            txt = File.open(file, "a")
            txt.puts "@import '../../components/modal/modal.wxss';"
            txt.close
        end
        # uploader
        if filename === "egUploader"
                    txt = File.open(file, "a")
                    txt.puts "@import '../../components/uploader/uploader.wxss';"
                    txt.close
                end
        File.rename(file, File::dirname(file) + "/" + filename + ".wxss")
    end
end
