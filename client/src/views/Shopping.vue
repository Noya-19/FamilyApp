<template>
    <v-main class="shopping">
                <form id="shopping-list">
                    <v-card
                        max-width="700"
                        tile
                    >
                        <v-toolbar
                        color="indigo darken-4"
                        dark
                        >
                        <v-toolbar-title>Shopping List</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogleft" persistent max-width="600px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="white"
                                        dark
                                        text
                                        v-bind="attrs"
                                        v-on="on">
                                    Add Item
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Items</span>
                                </v-card-title>
                                <v-container>
                                    <div title="Shopping List">
                                <v-text-field
                                    label="Item name"
                                    type="text"
                                    v-model="itemName"
                                    color="indigo darken-4"
                                ></v-text-field>
                                <br>
                                <v-text-field
                                    type="number"
                                    label="Amount"
                                    v-model="quantity"
                                    color="indigo darken-4"
                                ></v-text-field>
                                <br>
                                <div class="danger-alert" v-html="error" />
                                <br>
                                <v-btn
                                    color="indigo darken-4"
                                    text
                                    dark
                                    @click="dialogleft = false"
                                >Close
                                </v-btn>
                                <v-btn
                                    dark
                                    color="indigo darken-4"
                                    @click="dialogleft = false;
                                    addItem()"
                                >
                                    Add
                                </v-btn>
                            </div>
                            </v-container>
                            </v-card>
                        </v-dialog>
                        </v-toolbar>
                        <v-container
                            justify-space-between
                        >
                            <v-simple-table id="shopping-list-table"
                                fixed-header height="300px"
                            >
                                <thead>
                                    <tr>
                                        <th>Quantity</th>
                                        <th>Item</th>
                                        <th>Actions</th>
                                        <th>
                                        </th>
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
                                        <v-icon small
                                                class="mr-2"
                                                @click="editItem(item)"
                                                v-show="!item.inEditMode">
                                          mdi-pencil
                                        </v-icon>
                                        <v-icon small
                                                class="mr-2"
                                                @click="editItemComplete(item)"
                                                v-show="item.inEditMode">
                                          mdi-book-open
                                        </v-icon>
                                        <br/>
                                        <v-icon small
                                                class="mr-2"
                                                @click="removeItem(index)">
                                          mdi-delete
                                        </v-icon>
                                    </td>
                                </tr>
                            </v-simple-table>
                        </v-container>
                    </v-card>
                </form>
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
                                        color='indigo darken-4'
                                        @click="addRecipeToItemList(index)">Add</v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <v-row justify="center">
                                <v-dialog v-model="dialog" persistent max-width="600px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color='indigo darken-4'
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
                                                        <v-text-field label="Name"
                                                            v-model="recipeName"
                                                            required
                                                            color='indigo darken-4'
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <div class="row col-md-6">
                                                        <div class="col-md-6 form-group">

                                                            <v-text-field v-model="itemNameBox"
                                                                label="Ingredient"
                                                                clearable
                                                                color='indigo darken-4'
                                                            >
                                                            </v-text-field>
                                                          </div>
                                                        <div class="col-md-6 form-group">
                                                            <v-text-field v-model="quantityBox"
                                                                type="number"
                                                                lable="Quantity"
                                                                clearable
                                                                color='indigo darken-4'
                                                            ></v-text-field>
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
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="indigo darken-4" text @click="dialog = false">Close</v-btn>
                                            <v-btn color="indigo darken-4" @click="dialog = false; addRecipe()">Add</v-btn>
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
            recipesList:"",//what gets stored into recipies[]
            dialog: false,
            dialogleft:false
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
            console.log(this.itemsList.length);
        },

        openForm: function() {
            document.getElementById("myForm").style.display = "block";
        },

        closeForm: function() {
            document.getElementById("myForm").style.display = "none";
        },

        addRecipeToItemList(index) {
          this.itemsList.push.apply(this.itemsList,this.recipes[index].recipesList);
        }
    }
}
</script>

<style lang="scss" scoped>


</style>
