const tf = require('@tensorflow/tfjs');


//load test and train data
const iris = require('../../iris.json');
const irisTesting = require('../../iris-testing.json');

var lossValue;

exports.trainAndPredict = function(req,res){
    // //console.log(irisTesting)

    //===================================   STEP1    =============================================
    //ready the data for tensor-flow.js
    //extract the input from the data
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
    ]))

    ////console.log(trainingData.dataSync())

    //tensor of output(results) for training data
    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]))

    ////console.log(outputData.dataSync())

    //input for the testing data
    const testingData = tf.tensor2d(irisTesting.map(item => [
        item.sepal_length, item.sepal_width,
        item.petal_length, item.petal_width,
    ]))

    ////console.log(testingData.dataSync())    

    //======================================   STEP2  ==============================================
    
    // build neural network using a sequential model
    const model = tf.sequential()


    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }))


    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))



    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))

    
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.06),
    })
    //console.log(model.summary())

    async function run() {
        const startTime = Date.now()
        //train the model
        await model.fit(trainingData, outputData,         
            {
                epochs: 100,
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        //console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        //console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }
            
        )
            
        const results = model.predict(testingData);


        results.array().then(array => {
            res.status(200).send(array);
        })

    } 
    run()
}
