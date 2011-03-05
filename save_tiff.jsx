/*
@@@BUILDINFO@@@ Save Extra TIFF.jsx 0.0.0.1
 */

/*
 <javascriptresource>
 <name>Save Extra TIFF</name>
 <about>$$$/JavaScripts/SaveExtraTIFF/Description=This script is designed to be used as a script that runs after a save event. The script will save an extra TIFF file next to the current active document. This script does not handle 'as a copy' when saving.</about>
 <enableinfo>true</enableinfo>
 </javascriptresource>
 */

// このスクリプト用の変数は SET オブジェクトへすべて格納する
var SET = {};
app.displayDialogs = DialogModes.NO;
SET.document = activeDocument;

// TIFF ファイルを保存するフォルダと、拡張子を設定
SET.directory = '/tif/';
SET.Extension = '.tif';

// 8bit/ch 以外の画像を保存する場合は、ファイル名に '__' をつける
SET.prefix = '';
if (activeDocument.bitsPerChannel !== BitsPerChannelType.EIGHT) {
  SET.prefix = '__';
}

// 参考: http://www.openspc2.org/book/PhotoshopCS5/easy/save/011/index.html
SET.opt = new TiffSaveOptions();
SET.opt.alphaChannels = true;
SET.opt.annotations = true;
SET.opt.byteOrder = ByteOrder.IBM;  // or ByteOrder.MACOS
SET.opt.embedColorProfile = true;
SET.opt.imageCompression = TIFFEncoding.TIFFZIP;
SET.opt.layerCompression = LayerCompression.ZIP;
SET.opt.layers = true;
SET.opt.saveImagePyramid = false;
SET.opt.spotColors = false;
SET.opt.transparency = false;

// 保存するフォルダが存在しなければ作る
SET.saveDir = new Folder(activeDocument.path + SET.directory);
if (SET.saveDir.exists === false) {
  SET.saveDir.create();
}

// 保存！
activeDocument.saveAs( File( activeDocument.path +
                             SET.directory +
                             SET.prefix +
                             activeDocument.name +
                             SET.Extension ), SET.opt, true );
