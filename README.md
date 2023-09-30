#ffmpeg command:

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset ultrafast -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset superfast -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://localhost:1935/live/camera/0

ffmpeg -f dshow -i video="Integrated Webcam" -vf "format=yuv420p" -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://live-streaming-rtmp-server.vercel.app/live/camera/0

In this command:

-f dshow: Specifies the input format as DirectShow, which is suitable for Windows.
-i video="Integrated Camera": Specifies the video source. You may need to replace "Integrated Camera" with the actual name of your webcam device. You can list available video devices by running ffmpeg -list_devices true -f dshow -i dummy.
