<template>
    <v-main class="shopping">
        <h2>Shopping List</h2>
        <div class="grid-container">
            <div class="item1">
                <form id="shopping-list">

                    <table id="shopping-list-table" class="table table-condensed table-hover">
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Item</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tr v-for="(item, index) in itemsList">
                            <td>
                                <span v-show="!item.inEditMode">{{ item.quantity }}</span>
                                <input type="number" v-bind:placeholder="item.quantity" v-show="item.inEditMode" v-model="item.quantity" />
                            </td>
                            <td>
                                <span v-show="!item.inEditMode">{{ item.itemName }}</span>
                                <input v-bind:placeholder="item.itemName" v-show="item.inEditMode" v-model="item.itemName" />
                            </td>
                            <td>
                                <button type="button" class="btn btn-success" v-show="item.inEditMode" @click="editItemComplete(item)"><i class="fa fa-save"></i> Save  </button>
                                <button type="button" class="btn btn-info" v-show="!item.inEditMode" @click="editItem(item)"><i class="fa fa-edit"></i> Edit  </button>
                                <button type="button" class="btn btn-danger" @click="removeItem(index)"><i class="fa fa-remove"></i> Delete  </button>
                                <button type="button" class="console" @click="info(item)"><i class="fa fa-remove"></i> info  </button>
                            </td>
                        </tr>
                    </table>

                    <h4>Add new item</h4>
                    <div class="row col-md-6">
                        <div class="col-md-6 form-group">
                            Quantity
                            <input type="number" v-model="quantity" class="checkbox" autofocus>
                        </div>
                        <div class="col-md-6 form-group">
                            Name
                            <input type="text" v-model="itemName" class="checkbox">
                        </div>

                        <button type="button" @click="addItem" class="btn btn-primary"><i class="fa fa-plus"></i> Add  </button>
                    </div>
                </form>
            </div>
            <div class="item2">
                <h2>this is the start of the new item</h2>
                <v-simple-table fixed-header height="300px">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in recipes" :key="item.recipeName">
                                <td>{{ item.recipeName }}</td>
                                <td>
                                    <div class="my-2">
                                        <v-btn small
                                         @click="addRecipeToList(index)">Add</v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <v-row justify="center">
                                <v-dialog v-model="dialog" persistent max-width="600px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary"
                                               dark
                                               v-bind="attrs"
                                               v-on="on">
                                            Add Recipe
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Recipe Ingredients</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field label="Name" v-model="recipeName" required></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <div class="row col-md-6">
                                                        <div class="col-md-6 form-group">

                                                            <v-text-field v-model="itemNameBox"
                                                                          label="Ingredient"
                                                                          clearable></v-text-field>
                                                          </div>
                                                        <div class="col-md-6 form-group">                                                        
                                                            <v-text-field v-model="quantityBox"
                                                                          type="number"
                                                                          lable="Quantity"
                                                                          clearable></v-text-field>
                                                        </div>


                                                        <button type="button" @click="addItemRecipe" class="btn btn-primary"><i class="fa fa-plus"></i> Add Item</button>
                                                      </div>

                                                </v-row>
                                                <v-row>
                                                    <table id="shopping-list-table" class="table table-condensed table-hover">
                                                        <thead>
                                                            <tr>
                                                              <th>Quantity</th>
                                                              <th>Item</th>
                                                              <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tr v-for="(item, index) in recipesItem">
                                                            <td>
                                                              <span v-show="!item.inEditMode">{{ item.quantity }}</span>
                                                              <input type="number" v-bind:placeholder="item.quantity" v-show="item.inEditMode" v-model="item.quantity" />
                                                            </td>
                                                            <td>
                                                              <span v-show="!item.inEditMode">{{ item.itemName }}</span>
                                                              <input v-bind:placeholder="item.itemName" v-show="item.inEditMode" v-model="item.itemName" />
                                                            </td>
                                                            <td>
                                                              <button type="button" class="btn btn-success" v-show="item.inEditMode" @click="editItemComplete(item)"><i class="fa fa-save"></i> Save  </button>
                                                              <button type="button" class="btn btn-info" v-show="!item.inEditMode" @click="editItem(item)"><i class="fa fa-edit"></i> Edit  </button>
                                                              <button type="button" class="btn btn-danger" @click="removeItem(index)"><i class="fa fa-remove"></i> Delete  </button>
                                                              <button type="button" class="console" @click="info(item)"><i class="fa fa-remove"></i> info  </button>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </v-row>                                                
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                            <v-btn color="blue darken-1" @click="dialog = false; addRecipe()">Add</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                        </tfoot>
                    </template>
                </v-simple-table>
            </div>
        </div>

    </v-main>
</template>

<script>
export default {
  name: 'Shopping',
  title: 'Shopping',
  props: {
        },
    data: function () {
        return {
            quantity: '',
            itemName: '',
            itemsList: [],
            quantityBox: "",
            itemNameBox:"",
            inEditMode: false,
            recipes: [],//hold recipices like burger or omelette
            recipeName: '',//name of the recipe
            recipesItem: [],//acts like itemsList inside of recipes[] holding items to make the recipe
            recipesList:"",
            dialog: false,
        }
    },
    methods: {

        addItem() {//left shoppinglist
            var quantityIN = this.quantity;
            var itemNameIN = this.itemName.trim();
            this.itemsList.push({
                quantity: quantityIN,
                itemName: itemNameIN,
                inEditMode: false
            });
            this.clearAll();
        },

        addRecipe() {//recipeList
            console.log(this.recipesItem);
            this.recipes.push(
                {
                  recipeName: this.recipeName,
                  recipesList: this.recipesItem,
                },);
            this.clearRecipeName();
        },

        addItemRecipe() {//items within the recipe
          this.recipesItem.push({
            quantity: this.quantityBox,
            itemName: this.itemNameBox.trim(),
            inEditMode: false
          })
          this.clearItemRecipe();
        },

        clearQuantity: function () {
            this.quantity = '';
        },

        clearItemName: function () {
            this.itemName = '';
        },

        clearQuantityDialog: function () {
            this.quantityBox = '';
        },

        clearItemNameDialog: function () {
            this.itemNameBox = '';
       },

        clearRecipeName: function () {
          this.recipeName = '';
          this.recipesList = "";
          this.recipesItem = [];
        },

        clearAll: function () {
            this.clearQuantity();
            this.clearItemName();
        },

        clearItemRecipe() {
          this.clearItemNameDialog();
          this.clearQuantityDialog();
        },

        clearAllRecipe() {
          this.clearRecipeName();
        },

        removeItem: function (index) {
            this.itemsList.splice(index, 1); //delete 1 element from the array at the position index
       },

        editItem: function (item) {
            item.inEditMode = true;
        },

        editItemComplete: function (item) {
            item.inEditMode = false;
        },

        info: function (itemlist) {
            console.log(this.itemList.length);
        },

        openForm: function() {
            document.getElementById("myForm").style.display = "block";
        },

        closeForm: function() {
            document.getElementById("myForm").style.display = "none";
        },

        addRecipeToList(index) {
          console.log(this.itemsList)
          this.itemsList.push(this.recipes[index].recipesList);
          console.log(this.itemsList)
        }
    }
}
</script>

<style lang="scss" scoped>
    body {
        padding: 1%;
        background-color: #abca
    }

    h2, h4 {
        font-family: 'Nunito', sans-serif;
    }


    #shopping-list-table {
        table-layout: fixed;
        width: 50%;
        vertical-align: middle;
    }

    button {
        margin-left: 2%;
    }
    .grid-container {
        display: grid;
        height: 400px;
        align-content: center;
        grid-template-rows: 1.5fr 0 1.5fr;
        grid-gap: 10px;
        background-color: white;
        padding: 10px;
    }
    .item1 {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start:1;
        grid-column-end:2;
    }
    .item {
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start:2;
        grid-column-end:3;
    }

    /*.grid-container {
      grid-template-columns: 19.4rem 19.4rem 19.4rem 19.4rem 19.4rem;*//*200px 200px 200px 200px 200px 200px;*/
      /*grid-template-rows: 2.5rem 45rem auto;
      padding-left: $lg-gutter;
      padding-right: $lg-gutter;
      background-color: $light-gray;
      //background-color: black;
    }

    .grid-container {
      display: grid;
      grid-template-areas:
      " header header header header header"
      "left left left right right"
      " footer footer footer empty empty";
      grid-column-gap: 2rem;
    }

    .left,
    .right {
      margin-top: 0.625rem;
      height: 45rem;
      padding: 0.625rem;
      color: black;
      border: 0.0625rem solid $border-white;
      border-color: black;
      border-radius: 0.625rem;
      background-color:#F8F8F8;
      border-color: black;
      border-width: 0.125rem;
    }

    .header{
      padding-top: 1rem;;
    }*/

        /* Style the left column */
    /*.left {
      grid-area: left;
    }*/

        /* Style the right column */
    /*.right {
      grid-area: right;
    }*/

        /* Style the footer */
    /*.footer {
      grid-area: footer;
      background-color: $light-blue;
      height: 3rem;
      padding: 0.625rem;
      text-align: center;
      margin-top: 1.25rem;
      color: black;
      border: 0.0625rem solid $border-white;
      border-color: black;
      border-radius: 0.625rem;
      border-color: black;
      border-width: 0.125rem;
    }*/

</style>
