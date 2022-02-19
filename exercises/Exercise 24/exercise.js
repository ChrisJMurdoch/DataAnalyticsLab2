
const arr1=[20, 40, 4], arr2=[1, 12, 10], lerp=d3.interpolate(arr1, arr2);
const interpolant = 0.2;


d3.select("body")
    .append("h3")
    .text(`Array 1: ${arr1}`);

d3.select("body")
    .append("h3")
    .text(`Array 1: ${arr2}`);

d3.select("body")
    .append("h3")
    .text(`Interpolant: ${interpolant}`);

d3.select("body")
    .append("h3")
    .text(`Interpolated type: ${typeof(lerp)}`);

d3.select("body")
    .append("h3")
    .text(`Interpolated value: ${lerp(0.2)}`);

for (let i=0; i<arr1.length; i++) {
    const inverse = 1 - interpolant;
    d3.select("body")
        .append("p")
        .text(`interpolated[${i}] = ${inverse}*${arr1[i]} * ${interpolant}*${arr2[i]} = ${inverse*arr1[i] + interpolant*arr2[i] }`);
}

d3.select("body")
    .append("h3")
    .text(`Each value in the new array is based on the linear interpolation between the elements of the same index in the two input arrays.`);
