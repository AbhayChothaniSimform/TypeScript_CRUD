
export class CRUD {
    isId = document.getElementById('inId') as HTMLInputElement;
    isName = document.getElementById('inName') as HTMLInputElement;
    isImage: any = document.getElementById('inImage') as HTMLInputElement;
    isPrice = document.getElementById('inPrice') as HTMLInputElement;
    isDesc = document.getElementById('inDescription') as HTMLInputElement;
    setUrl: string = ""
    add() {

        // const id = isId.value;
        // let image = isImage.files[0];
        let product: any[] = [];
        const fr: any = new FileReader();
        fr.readAsDataURL(this.isImage.files[0]);
        fr.addEventListener('load', () => {
            let url = fr.result;
            if (localStorage.getItem("ProductDetail") == null) {
                product = [];
            }
            else {
                product = JSON.parse(localStorage.getItem("ProductDetail")!);
            }

            product.push({
                id: this.isId.value,
                name: this.isName.value,
                image: url,
                price: this.isPrice.value,
                description: this.isDesc.value
            });

            //Convert a JavaScript object into a string with JSON.stringify(). now productArray is string and ready to sent to localstorage
            localStorage.setItem("ProductDetail", JSON.stringify(product));
            location.reload();

        });


    }
    showData() {

        let product;
        if (localStorage.getItem("ProductDetail") == null) {
            product = [];
        }
        else {
            //Parse the data with JSON.parse(), and the data becomes a JavaScript object.
            product = JSON.parse(localStorage.getItem("ProductDetail")!);
        }
        let html = "";
        product.forEach(function (element: any, index: any) {

            html += "<tr class='productItems'>";
            html += "<td> <b>" + element.id + " </b></td>";
            html += "<td>" + element.name + "</td>";
            html += "<td><img src='" + element.image + "' width='80px' height='80px'></td>";
            html += "<td>" + element.price + "</td>";
            html += "<td>" + element.description + "</td>";
            html += `<td><button class="btn btn-outline-success ms-5 edit" data-id=${index}>Edit </button></td>`;
            html += `<td><button class="btn btn-outline-danger ms-5 delete" data-id=${index}>Delete </button></td>`;
            html += "<tr>";

        });
        document.querySelector("#dataTable1 tbody")!.innerHTML = html;

    }

    DeleteData(element: string) {
        let product;
        if (localStorage.getItem("ProductDetail") == null) {
            product = [];
        }
        else {
            product = JSON.parse(localStorage.getItem("ProductDetail")!);
        }
        let confirmation = confirm("Do you want to Delete Product : " + product[element].name + ".");
        if (confirmation == true) {
            product.splice(element, 1);
            localStorage.setItem("ProductDetail", JSON.stringify(product));
            window.location.reload();
            this.showData();
        }
    }



    EditData(index: string) {
        //  let image = isImage.files ;
        let product: any;
        var url = this.setUrl;
        console.log(url);

        var fileInput =
            document.getElementById('inImage');


        if (localStorage.getItem("ProductDetail") == null) {
            product = [];
        }
        else {
            product = JSON.parse(localStorage.getItem("ProductDetail")!);
        }
        this.isId.value = product[index].id;
        this.isName.value = product[index].name;

        this.isPrice.value = product[index].price;
        this.isDesc.value = product[index].description;
        document.getElementById("btnInsert")!.style.display = "none";
        document.getElementById("btnUpdate")!.style.display = "block";

        document.querySelector("#btnUpdate")!.addEventListener('click', function () {

            let isId = document.getElementById('inId') as HTMLInputElement;
            let isName = document.getElementById('inName') as HTMLInputElement;
            let isPrice = document.getElementById('inPrice') as HTMLInputElement;
            let isDesc = document.getElementById('inDescription') as HTMLInputElement;
            let isImage = document.getElementById('inImage') as HTMLInputElement;
            const fr: any = new FileReader();
            let img = isImage.files as any
            fr.readAsDataURL(img[0]);
            fr.addEventListener('load', () => {
                let url = fr.result;

                product[index].id = isId.value;
                product[index].name = isName.value;
                product[index].price = isPrice.value;
                product[index].image = url
                product[index].description = isDesc.value;


                localStorage.setItem("ProductDetail", JSON.stringify(product)!);
            });

            document.getElementById("btnInsert")!.style.display = "none";
            document.getElementById("btnUpdate")!.style.display = "block";
            window.location.reload();
        })


    }
}