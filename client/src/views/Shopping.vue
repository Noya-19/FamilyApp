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
        <br/>
        <v-card max-width="700"
                tile>
            <v-toolbar color="indigo darken-4"
                       dark>
              <v-toolbar-title>Recipe List</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color='white'
                             dark
                             v-bind="attrs"
                             text
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
                                                      color='indigo darken-4'></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <div class="col-md-6 form-group">

                                      <v-text-field v-model="itemNameBox"
                                                    label="Ingredient"
                                                    clearable
                                                    color='indigo darken-4'>
                                      </v-text-field>
                                    </div>

                                    <div class="col-md-6 form-group">
                                      <v-text-field type="number"
                                                    label="Amount"
                                                    v-model="quantityBox"
                                                    color="indigo darken-4"></v-text-field>
                                    </div>
                                    <v-btn elevation="2"
                                          normal
                                           color="indigo darken-4"
                                           dark
                                            @click="addItemRecipe">
                                      Add Ingredient
                                    </v-btn>
                                    <br/>

                                </v-row>
                                <v-row>
                                    <v-card min-width="550" class="addItemRecipeCard">
                                        <v-simple-table id="shopping-list-table"
                                                        fixed-header height="300px">
                                            <thead>
                                                <tr>
                                                  <th>Quantity</th>
                                                  <th>Item</th>
                                                  <th>Actions</th>
                                                  <th>
                                                  </th>
                                                </tr>
                                            </thead>
                                            <tr v-for="(item, index) in recipesItem">
                                                <td>
                                                  <span v-show="!item.inEditMode">{{ item.quantity }}</span>
                                                  <input type="number" v-bind:placeholder="item.quantity" v-show="item.inEditMode" v-model="item.quantity" class="col-md-6 form-group" />
                                                </td>
                                                <td>
                                                  <span v-show="!item.inEditMode">{{ item.itemName }}</span>
                                                  <input v-bind:placeholder="item.itemName" v-show="item.inEditMode" v-model="item.itemName" class="col-md-6 form-group" />
                                                </td>
                                                <td>
                                                  <v-icon small
                                                          class="mr-2"
                                                          @click=" editRecipeItem(item)"
                                                          v-show="!item.inEditMode">
                                                    mdi-pencil
                                                  </v-icon>
                                                  <v-icon small
                                                          class="mr-2"
                                                          @click="editRecipeItemComplete(item)"
                                                          v-show="item.inEditMode">
                                                    mdi-book-open
                                                  </v-icon>
                                                  <br />
                                                  <v-icon small
                                                          class="mr-2"
                                                          @click=" removeRecipeItem(index)">
                                                    mdi-delete
                                                  </v-icon>
                                              </td>
                                            </tr>
                                        </v-simple-table>
                                    </v-card>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="indigo darken-4" text @click="dialog = false">Close</v-btn>
                          <v-btn color="indigo darken-4" dark @click="dialog = false; addRecipe()">Add</v-btn>
                          </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>

            <v-simple-table fixed-header height="300px">

                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in recipes" :key="item.recipeName">
                        <td>{{ item.recipeName }}</td>
                        <td>
                            <v-btn elevation="2"
                                   small
                                   @click=" addRecipeToItemList(index)"
                                   color="indigo darken-4"
                                   dark>
                              Add to <br/> Shopping list
                            </v-btn>
                            <br />
                            <v-icon small
                                    class="mr-2"
                                    @click=" removeRecipe(index)"
                                    vertical-align: middle>
                              mdi-delete
                            </v-icon>
                        </td>
                  </tr>
                </tbody>

            </v-simple-table>
        </v-card>
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
            itemsList: [
              {
                quantity: "12",
                itemName: 'Eggs',
                inEditMode: false,
              },
              {
                quantity: "1",
                itemName: 'Milk',
                inEditMode: false,
              },
              {
                quantity: "1",
                itemName: 'FFVII',
                inEditMode: false,
              },
            ],
            quantityBox: "",
            itemNameBox:"",
            inEditMode: false,
            recipes: [
              {
                recipeName: 'Sandwich',
                recipesItem: [
                  {
                    quantity: "1",
                    itemName: 'soup',
                    inEditMode: false,
                  },
                ],
              },
              {
                recipeName: 'Omelette',
                recipesItem: [
                  {
                    quantity: "12",
                    itemName: 'Eggs',
                    inEditMode: false,
                  },
                ],
              },
              
            ],//hold recipices like burger or omelette
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
         removeRecipeItem: function (index) {
          this.recipesItem.splice(index, 1); //delete 1 element from the array at the position index
         },
        removeRecipe: function (index) {
          this.recipes.splice(index, 1); //delete 1 element from the array at the position index
        },
        editItem: function (item) {
            item.inEditMode = true;
        },
        editRecipeItem: function (item) {
            item.inEditMode = true;
        },
        editItemComplete: function (item) {
            item.inEditMode = false;
        },
        editRecipeItemComplete: function (item) {
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
    },
    watch: {
        //Remove once backend is completed
        itemsList: function () {
            this.$store.dispatch("setItemList", this.itemsList)
            console.log(this.itemsList)
            console.log(this.$store.state.itemList)
        }
    }
}
</script>

<style lang="scss" scoped>
  .addItemRecipeCard{
      justify-content:center;
  }

</style>
