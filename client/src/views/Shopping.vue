<template>
  <v-main class="shopping">
    <form id="shopping-list">
      <v-card max-width="700" tile>
        <v-toolbar color="indigo darken-4" dark>
          <v-toolbar-title>Shopping List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="shoppingListDisplay" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" dark text v-bind="attrs" v-on="on">
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
                  <br />
                  <v-text-field
                    type="number"
                    label="Amount"
                    v-model="quantity"
                    color="indigo darken-4"
                  ></v-text-field>
                  <br />
                  <v-btn
                    color="indigo darken-4"
                    text
                    dark
                    @click="shoppingListDisplay = false"
                    >Close
                  </v-btn>
                  <v-btn
                    dark
                    color="indigo darken-4"
                    @click="
                      shoppingListDisplay = false;
                      addItem();
                    "
                  >
                    Add
                  </v-btn>
                </div>
              </v-container>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-container justify-space-between>
          <v-simple-table id="shopping-list-table" fixed-header height="300px">
            <thead>
              <tr>
                <th style="text-align:center">Quantity</th>
                <th style="text-align:center">Item</th>
                <th style="text-align:center">Edit</th>
                <th style="text-align:center">Delete</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in itemsList">
              <td style="text-align:center">
                <span v-show="!item.inEditMode">{{ item.quantity }}</span>
                <input
                  type="number"
                  v-bind:placeholder="item.quantity"
                  v-show="item.inEditMode"
                  v-model="item.quantity"
                />
              </td>
              <td style="text-align:center">
                <span v-show="!item.inEditMode">{{ item.itemName }}</span>
                <input
                  v-bind:placeholder="item.itemName"
                  v-show="item.inEditMode"
                  v-model="item.itemName"
                />
              </td>
              <td style="text-align:center">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                  v-show="!item.inEditMode"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  small
                  class="mr-2"
                  @click="editItemComplete(item)"
                  v-show="item.inEditMode"
                >
                  mdi-book-open
                </v-icon>
              </td>
              <td style="text-align:center">
                <v-icon small class="mr-2" @click="removeItem(index)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </v-simple-table>
        </v-container>
      </v-card>
    </form>
    <br />
    <v-card max-width="700" tile>
      <v-toolbar color="indigo darken-4" dark>
        <v-toolbar-title>Recipe List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="recipeListDisplay" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" dark v-bind="attrs" text v-on="on">
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
                    <v-text-field
                      label="Name"
                      v-model="recipeName"
                      required
                      color="indigo darken-4"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <div class="col-md-6 form-group">
                    <v-text-field
                      v-model="itemNameBox"
                      label="Ingredient"
                      clearable
                      color="indigo darken-4"
                    >
                    </v-text-field>
                  </div>

                  <div class="col-md-6 form-group">
                    <v-text-field
                      type="number"
                      label="Amount"
                      v-model="quantityBox"
                      color="indigo darken-4"
                    ></v-text-field>
                  </div>
                  <v-btn
                    elevation="2"
                    normal
                    color="indigo darken-4"
                    dark
                    @click="addItemToRecipeList"
                  >
                    Add Ingredient
                  </v-btn>
                  <br />
                </v-row>
                <v-row>
                  <v-card min-width="550" class="addItemRecipeCard">
                    <v-simple-table
                      id="shopping-list-table"
                      fixed-header
                      height="300px"
                    >
                      <thead>
                        <tr>
                          <th>Quantity</th>
                          <th>Item</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tr v-for="(item, index) in recipesItem">
                        <td>
                          <span v-show="!item.inEditMode">{{
                            item.quantity
                          }}</span>
                          <input
                            type="number"
                            v-bind:placeholder="item.quantity"
                            v-show="item.inEditMode"
                            v-model="item.quantity"
                            class="col-md-6 form-group"
                          />
                        </td>
                        <td>
                          <span v-show="!item.inEditMode">{{
                            item.itemName
                          }}</span>
                          <input
                            v-bind:placeholder="item.itemName"
                            v-show="item.inEditMode"
                            v-model="item.itemName"
                            class="col-md-6 form-group"
                          />
                        </td>
                        <td>
                          <v-icon
                            small
                            class="mr-2"
                            @click="editRecipeItem(item)"
                            v-show="!item.inEditMode"
                          >
                            mdi-pencil
                          </v-icon>
                          <v-icon
                            small
                            class="mr-2"
                            @click="editRecipeItemComplete(item)"
                            v-show="item.inEditMode"
                          >
                            mdi-book-open
                          </v-icon>
                        </td>
                        <td>
                          <v-icon
                            small
                            class="mr-2"
                            @click="removeRecipeItem(index)"
                          >
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
              <v-btn
                color="indigo darken-4"
                text
                @click="recipeListDisplay = false"
                >Close</v-btn
              >
              <v-btn
                color="indigo darken-4"
                dark
                @click="
                  recipeListDisplay = false;
                  addRecipe();
                "
                >Add</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <!-- table for recipieslist -->
      <v-simple-table fixed-header height="300px">
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th style="text-align:center">Add To Shopping List</th>
            <th style="text-align:center">Edit</th>
            <th style="text-align:center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(outerItem, outerIndex) in recipes">
            <td style="text-align:center">{{ outerItem.recipeName }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="addRecipeToItemList(outerIndex)"
              >
                mdi-plus
              </v-icon>
            </td>
            <!-- This opens dialog box for editing recipies -->
            <td>
              <v-dialog v-model="editDialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="blue"
                    dark
                    v-bind="attrs"
                    class="mr-2"
                    v-on="on"
                    @click="duplicateRecipiesItems(outerIndex)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Recipe Ingredients</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Name"
                            v-model="outerItem.recipeName"
                            required
                            color="indigo darken-4"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <div class="col-md-6 form-group">
                          <v-text-field
                            v-model="itemNameBox"
                            label="Ingredient"
                            clearable
                            color="indigo darken-4"
                          >
                          </v-text-field>
                        </div>

                        <div class="col-md-6 form-group">
                          <v-text-field
                            type="number"
                            label="Amount"
                            v-model="quantityBox"
                            color="indigo darken-4"
                          ></v-text-field>
                        </div>
                        <v-btn
                          elevation="2"
                          normal
                          color="indigo darken-4"
                          dark
                          @click="editAddItemRecipe"
                        >
                          Add Ingredient
                        </v-btn>
                        <br />
                      </v-row>
                      <v-row>
                        <v-card min-width="550" class="addItemRecipeCard">
                          <v-simple-table
                            id="recipies-edit-table"
                            fixed-header
                            height="300px"
                          >
                            <thead>
                              <tr>
                                <th>Quantity</th>
                                <th>Item</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <!-- try makeing this an array = to .recipiesItem -->
                            <tr
                              v-for="(innerItem,
                              innerIndex) in dupRecipesItems"
                            >
                              <td>
                                <span v-show="!innerItem.inEditMode">{{
                                  innerItem.quantity
                                }}</span>
                                <input
                                  type="number"
                                  v-bind:placeholder="innerItem.quantity"
                                  v-show="innerItem.inEditMode"
                                  v-model="innerItem.quantity"
                                  class="col-md-6 form-group"
                                />
                              </td>

                              <td>
                                <span v-show="!innerItem.inEditMode">{{
                                  innerItem.itemName
                                }}</span>
                                <input
                                  v-bind:placeholder="innerItem.itemName"
                                  v-show="innerItem.inEditMode"
                                  v-model="innerItem.itemName"
                                  class="col-md-6 form-group"
                                />
                              </td>
                              <td>
                                <v-icon
                                  small
                                  class="mr-2"
                                  @click="editRecipeItem(innerItem)"
                                  v-show="!innerItem.inEditMode"
                                >
                                  mdi-pencil
                                </v-icon>
                                <v-icon
                                  small
                                  class="mr-2"
                                  @click="editRecipeItemComplete(innerItem)"
                                  v-show="innerItem.inEditMode"
                                >
                                  mdi-book-open
                                </v-icon>
                              </td>
                              <td>
                                <v-icon
                                  small
                                  class="mr-2"
                                  @click="editRemoveRecipeItem(innerIndex)"
                                >
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
                    <v-btn
                      color="indigo darken-4"
                      text
                      @click="editDialog = false"
                      >Close</v-btn
                    >
                    <!-- need to add update recipie method -->
                    <v-btn
                      color="indigo darken-4"
                      dark
                      @click="
                        editDialog = false;
                        updateRecipie(outerIndex);
                      "
                      >Add</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="removeRecipe(outerIndex)"
                vertical-align:
                middle
              >
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
import ShoppingListService from '@/services/ShoppingListService'
export default {
  name: "Shopping",
  title: "Shopping",
  props: {},
  data: function() {
    return {
      quantity: "",
      itemName: "",
      itemsList: [],
      quantityBox: "",
      itemNameBox: "",
      inEditMode: false,
      recipes: [
        {
          recipeName: "Sandwich",
          recipesList: [
            {
              quantity: "1",
              itemName: "soup",
              inEditMode: false
            }
          ]
        },
        {
          recipeName: "Omelette",
          recipesList: [
            {
              quantity: "12",
              itemName: "Eggs",
              inEditMode: false
            }
          ]
        }
      ],
      quantityBox: "",
      itemNameBox: "",
      inEditMode: false,
      //recipes: [], //hold recipices like burger or omelette
      recipeName: "", //name of the recipe
      recipesItem: [], //acts like itemsList inside of recipes[] holding items to make the recipe
      recipesList: "", //what gets stored into recipies[]
      shoppingListDisplay: false,
      recipeListDisplay: false,
      editDialog: false,
      dupRecipesItems: Array(0)
    };
  },
  methods: {
    async addItem() {
      //left shoppinglist
      var quantityIN = this.quantity;
      var itemNameIN = this.itemName.trim();
      var itemToAdd = {
        quantity: quantityIN,
        itemName: itemNameIN,
        inEditMode: false,
        FamilyId: this.$store.state.user.FamilyId
      };
      this.itemsList.push(itemToAdd);
      try {
          const reponse = await ShoppingListService.createItem(itemToAdd);
      } catch (error) {
          this.error = error.response.data.error
      }
      this.clearAll();
    },

    async addRecipe() {
      //recipeList
      var response;
      console.log(this.recipes.includes(this.recipeName))
      if(!this.recipes.includes(this.recipeName)){
        console.log(this.recipesItem);
        var myJsonString = JSON.stringify(this.recipesItem)
        var recipeToAdd = {
          recipeName: this.recipeName,
          recipesList: this.recipesItem,
          FamilyId: this.$store.state.user.FamilyId
        }
      this.recipes.push(recipeToAdd);
      recipeToAdd.recipesList = myJsonString
      try {
        response = await ShoppingListService.createRecipe(recipeToAdd);
      } catch (error) {
          this.error = error.response.data.error
      }
        console.log(JSON.parse(response.data.recipesList))
        this.clearRecipeName();
      }
    },

    addItemToRecipeList() {
      //items within the recipe
      
      this.recipesItem.push({
        quantity: this.quantityBox,
        itemName: this.itemNameBox.trim(),
        inEditMode: false
      });
      this.clearItemRecipe();
    },
    //adds items to the edit recipies list
    editAddItemRecipe() {
      this.dupRecipesItems.push({
        quantity: this.quantityBox,
        itemName: this.itemNameBox.trim(),
        inEditMode: false
      });
      this.clearItemRecipe();
    },

    clearQuantity: function() {
      this.quantity = "";
    },

    clearItemName: function() {
      this.itemName = "";
    },

    clearQuantityDialog: function() {
      this.quantityBox = "";
    },

    clearItemNameDialog: function() {
      this.itemNameBox = "";
    },

    clearRecipeName: function() {
      this.recipeName = "";
      this.recipesList = "";
      this.recipesItem = [];
    },

    clearAll: function() {
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

    removeItem: function(index) {
      this.itemsList.splice(index, 1); //delete 1 element from the array at the position index
    },
    removeRecipeItem: function(index) {
      this.recipesItem.splice(index, 1); //delete 1 element from the array at the position index
    },
    removeRecipe: function(index) {
      this.recipes.splice(index, 1); //delete 1 element from the array at the position index
    },
    editItem: function(item) {
      item.inEditMode = true;
    },
    editRecipeItem: function(item) {
      item.inEditMode = true;
    },
    editItemComplete: function(item) {
      item.inEditMode = false;
    },
    editRecipeItemComplete: function(item) {
      item.inEditMode = false;
    },
    editRemoveRecipeItem(index){
      this.dupRecipesItems.splice(index,1)
    },

    // info: function(itemlist) {
    //   console.log(this.itemsList.length);
    // },

    openForm: function() {
      document.getElementById("myForm").style.display = "block";
    },

    closeForm: function() {
      document.getElementById("myForm").style.display = "none";
    },

    addRecipeToItemList(index) {
      this.itemsList.push.apply(
        this.itemsList,
        this.recipes[index].recipesList
      );
      //loops through entire itemsList
      for (let i = 0; i < this.itemsList.length; i++) {
        //grabs first item
        for (let j = i + 1; j < this.itemsList.length; j++) {
          //checks with all items after it
          if (
            this.itemsList[i].itemName.toLowerCase() ==
            this.itemsList[j].itemName.toLowerCase()
          ) {
            //if duplicate is found add the quanities and delete the second
            this.itemsList[i].quantity =
              Number(this.itemsList[i].quantity) +
              Number(this.itemsList[j].quantity);
            this.itemsList.splice(j, 1);
          } //end if
        } //end for
      } //end for

    },

    duplicateRecipiesItems(index) {
      this.dupRecipesItems = this.recipes[index].recipesList;
    },
    updateRecipie(index) {
      this.recipes[index].recipesList = this.dupRecipesItems;
      console.log(this.recipes)
    }
  },
  mounted: async function () {
    this.itemsList = this.$store.state.itemList
  }
};
</script>

<style lang="scss" scoped>
.addItemRecipeCard {
  justify-content: center;
}
</style>
