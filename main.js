let img = '';
let pixel_slider;
let pixel_width;
let pixel_height;
let input;
let save_button;
let colorPicker;

function setup() {
  canvas = createCanvas(1000, 1000);
  canvas.drop(gotFile); // ドラッグ＆ドロップされた画像を取得
  frameRate(2); // randomで色がチカチカしすぎないよう、アニメーションの速度を下げる

  pixelDensity(1); // 解像度を変えたい場合は、ここをいじる
  background(0);

  textSize(30);
  fill(255, 0, 0);
  text("pixel_size", width * 0.75, height * 0.05);
  text("line_width", width * 0.75, height * 0.15);
  text("pixel_width", width * 0.05, height * 0.05);
  text("pixel_height", width * 0.05, height * 0.15);

  // 操作用のGUIの作成
  pixel_slider = createSlider(0, 100, 50, 5);
  pixel_slider.position(width * 0.75, height * 0.15);
  pixel_slider.style("width", "200px");
  line_slider = createSlider(0, 5, 0, 0.5);
  line_slider.position(width * 0.75, height * 0.25);
  line_slider.style("width", "200px");
  pixel_width = createSlider(1, 5, 1, 0.5);
  pixel_width.position(width * 0.05, height * 0.15);
  pixel_width.style("width", "200px");
  pixel_height = createSlider(1, 5, 1, 0.5);
  pixel_height.position(width * 0.05, height * 0.25);
  pixel_height.style("width", "200px");

  input = createFileInput(gotFile);
  input.position(width * 0.35, height * 0.1);
  input.size(150, 300);
  save_button = createButton("-- S A V E --");
  save_button.position(width * 0.55, height * 0.1);
  save_button.size(100, 30);
  save_button.mousePressed(save_file);
  colorPicker = createColorPicker("#ed225d");
  colorPicker.position(width * 0.35, height * 0.15);

  textSize(width / 25);
  textAlign(CENTER, CENTER);
  fill(255);
  text("好きな画像をドラッグ＆ドロップしてネ☆彡", width / 2, height / 4);
  text("画像を保存したいときはクリックしてネ☆彡", width / 2, height / 3);
}

function draw() {
    if (img) {
      background(255);
      // canvasの大きさを画像の大きさに変更
      resizeCanvas(img.width, img.height);

      // スライダーの入力値に応じてモザイクの大きさを決める
      let step = pixel_slider.value();

      // 各ピクセルの縦横を調整するための変数
      let pix_x = pixel_width.value();
      let pix_y = pixel_height.value();

      // 線の色
      let line_color = colorPicker.value();
      // 線の太さ
      let line_width = line_slider.value();

      //console.log(slider.value())
      //console.log(step)

      image(img, 0, 0);

      for (let j = 0; j < height; j += (step * pix_y)) {
        for (let i = 0; i < width; i += (step * pix_x)) {
          // let color = img.get(i, j);
          // ランダムなグレースケール
          let color = random(255);
          storeItem('color', color);

          // 指定した色で四角形を描画
          stroke(line_color);
          strokeWeight(line_width);
          blendMode(OVERLAY);
          fill(color);
          rect(i, j, step * pix_x, step * pix_y);
        }
      }
    }
}

function gotFile(file) {
  img = loadImage(file.data, '');
}

// inputから投稿したファイルの処理
function handleFile(file) {
  print(file);
  if (file.type === "image") {
    img = createImg(file.data, "");
    img.hide();
  } else {
    img = null;
  }
}

function save_file() {
    saveCanvas("myImage", "png");
}
