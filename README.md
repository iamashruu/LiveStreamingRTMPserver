#ffmpeg command:

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset ultrafast -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset superfast -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -framerate 30 -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://rtmp-server-1zuo.onrender.com:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://44.226.122.3:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -preset veryfast -tune zerolatency -an -f mpegts - | ffmpeg -i - -c copy -f hls -hls_time 2 -hls_list_size 5 http://localhost:8000/stream.m3u8

In this command:

-f dshow: Specifies the input format as DirectShow, which is suitable for Windows.
-i video="Integrated Camera": Specifies the video source. You may need to replace "Integrated Camera" with the actual name of your webcam device. You can list available video devices by running

ffmpeg -list_devices true -f dshow -i dummy
