// myPage.js (oder ein anderer Dateiname)
$w.onReady(function () {
    // Event-Handler für den Button
    $w("#recordButton").onClick(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                console.log('Mikrofonzugriff gewährt.');
                startRecording(stream);
            })
            .catch(error => {
                console.error('Fehler beim Mikrofonzugriff:', error);
                $w("#errorText").text = 'Mikrofonzugriff wurde verweigert oder ein anderer Fehler ist aufgetreten.';
                $w("#errorText").show();
            });
    });

    function startRecording(stream) {
        const mediaRecorder = new MediaRecorder(stream);
        let audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioChunks = [];
            // Hier kannst du den nächsten Schritt wie die Transkription einfügen
        };

        mediaRecorder.start();
        $w("#recordButton").label = "Aufnahme stoppen";
        $w("#recordButton").onClick(() => {
            mediaRecorder.stop();
            $w("#recordButton").label = "Aufnahme starten";
        });
    }
});



