const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        const prediction = model.predict(tensor);
        const scoreArray = await prediction.data();
        const score = scoreArray[0];
        const threshold = 0.5;
        const label = score >= threshold ? 'Cancer' : 'Non-cancer';
        const confidenceScore = score * 100;

        let suggestion;

        if (label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        } else if (label === 'Non-cancer') {
            suggestion = 'Hasil prediksi menunjukkan kemungkinan non-kanker. '+
            'Tetap pantau area yang diperiksa dan perhatikan perubahan apa pun. '+
            'Jika ada perubahan yang mencurigakan, segera konsultasikan dengan dokter.';
        }

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }

}
 
module.exports = predictClassification;